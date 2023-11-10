import path from 'path';
import { runAppleScript } from 'run-applescript';
import { Text, fs } from '../index.js';

export interface KeynoteSlide {
  number: number;
  skipped: boolean;
  layout: string;
  title: string;
  body: string;
  notes: string;
}

export interface KeynoteDeck {
  id: string;
  name: string;
  file: string;
  theme: string;
  height: number;
  width: number;
  slides: KeynoteSlide[];
}

export type KeynoteExportFormat = 'JSON' | 'JSON with images' | 'HTML' | 'QuickTime movie' | 'PDF' | 'slide images' | 'Microsoft PowerPoint' | 'Keynote 09';

export interface KeynoteExportOptions {
  path?: string;
  format?: KeynoteExportFormat;
  imageFormat?: 'JPEG' | 'PNG' | 'TIFF';
  movieFormat?: 'format360p' | 'format540p' | 'format720p' | 'format1080p' | 'format2160p' | 'native size';
  movieCodec?: 'h264' | 'AppleProRes422' | 'AppleProRes4444' | 'AppleProRes422LT' | 'AppleProRes422HQ' | 'AppleProRes422Proxy' | 'HEVC';
  movieFramerate?: 'FPS12' | 'FPS2398' | 'FPS24' | 'FPS25' | 'FPS2997' | 'FPS30' | 'FPS50' | 'FPS5994' | 'FPS60';
  exportStyle?: 'IndividualSlides' | 'SlideWithNotes' | 'Handouts';
  allStages?: boolean;
  skippedSlides?: boolean;
  borders?: boolean;
  slideNumbers?: boolean;
  date?: boolean;
  rawkpf?: boolean;
  password?: boolean;
  passwordHint?: boolean;
  includeComments?: boolean;
  pdfImageQuality?: 'Good' | 'Better' | 'Best';
}

export class Keynote {
  protected deck?: KeynoteDeck;

  protected constructor() {};

  static async open(file: string) {
    return new Keynote().open(file);
  }

  static async quit() {
    return runAppleScript('tell application "Keynote" to quit')
      .then(() => true)
      .catch(() => false);
  }

  get id() {
    return this.deck?.id;
  }

  get title() {
    return this.deck?.name.replace('.key', '') ?? '';
  }

  get name() {
    return this.deck?.name ?? '';
  }

  get file() {
    return this.deck?.file ?? '';
  }

  get theme() {
    return this.deck?.theme ?? '';
  }

  get width() {
    return this.deck?.width ?? 0;
  }

  get height() {
    return this.deck?.height ?? 0;
  }

  get slides() {
    return this.deck?.slides ?? [];
  }

  toJSON() {
    return this.deck;
  }

  async open(file: string) {
    this.deck = await runAppleScript(`
    tell application "Keynote"
      open the POSIX file "${file}"
      return id of front document
    end tell
    `).then(id => this._getDeckInfo(id));
    return Promise.resolve(this);
  }

  async refresh() {
    if (this.deck) {
      return this._getDeckInfo(this.deck.id).then(deck => {
        this.deck = deck;
        return true;
      });
    } else {
      return Promise.resolve(false);
    }
  }

  async close() {
    if (this.deck) {
      return runAppleScript(`tell application "Keynote" to close document id "${this.deck?.id}"`).then(() => true);
    } else {
      return Promise.resolve(false);
    }
  }

  async export(options: KeynoteExportOptions = {}) {
    const defaults = {
      path: path.resolve('.', this.title),
      format: 'JSON with images',
      exportStyle: 'IndividualSlides',
      imageFormat: 'JPEG',
      skippedSlides: false,
    }

    let { path: dir, format, ...opt } = { ...defaults, ...options };
    let cwd = fs.dir(dir);

    // JSON format formats aren't part of the official spec, but what the hey.
    if (format === 'JSON' || 'JSON with images') {
      const json = {
        ...this.deck,
        slides: this.slides.filter(s => options.skippedSlides || (s.skipped === false))
      }
      cwd.file('deck.json', { content: json });
      if (format === 'JSON with images') {
        format = 'slide images';
      } else { 
        return Promise.resolve(cwd.path('deck.json'));
      }
    }

    switch (format) {
      case 'slide images':
        cwd = cwd.dir('images');
        break;
      case 'HTML':
        cwd = cwd.dir('html');
        break;
      case 'PDF':
        cwd = cwd.file(opt.exportStyle + '.pdf');
        break;
      case 'Keynote 09':
        cwd = cwd.file(opt.exportStyle + '.key');
        break;
      case 'Microsoft PowerPoint':
        cwd = cwd.file(opt.exportStyle + '.pptx');
        break;
    }

    // Construct the applescript snippet    
    let scr = '';
    scr += `tell application "Keynote"\n`;
    scr += `  set deck to document id "${this.id}"\n`;
    scr += `  set the current slide of deck to slide 1 of deck\n`
    scr += `  export deck as ${format} to POSIX file "${cwd.path()}"`;
    if (Object.entries(opt).length) {
      scr += ' with properties { ' + Object.entries(opt).map(([k, v]) => Text.noCase(k) + ':' + v).join(', ') + ' }\n';
    }
    scr += `end tell`;
    return runAppleScript(scr);
  }

  protected async _getDeckInfo(id: string): Promise<KeynoteDeck> {
    const valDelimiter = "";
    const deck: KeynoteDeck = await runAppleScript(`
      set i to "${id}"
      set valueDelim to "${valDelimiter}"
      tell application "Keynote"
        set deck to document id i
        set p to the file of deck
        
        set v to { i }
        set v to v & the name of deck
        set v to v & the POSIX path of p
        set v to v & the name of the document theme of deck
        set v to v & the height of deck
        set v to v & the width of deck

        set AppleScript's text item delimiters to valueDelim
        return v as string
      end tell
    `)
    .then(result => {
      const [id, name, file, theme, height, width] = result.split(valDelimiter);
      return {
        id,
        name,
        file,
        theme,
        height: Number.parseInt(height),
        width: Number.parseInt(width),
        slides: []
      };
    });
    deck.slides = await this._getSlides(id);
    return Promise.resolve(deck);
  }

  protected async _getSlides(id: string) {
    const slideDelimiter = "";
    const valDelimiter = "";

    return runAppleScript(`
      set i to "${id}"
      set slideDelim to "${slideDelimiter}"
      set valueDelim to "${valDelimiter}"

      tell application "Keynote"
        set ss to {}
        set sd to {}

        repeat with s in every slide of document id i
          set ss to ss & the slide number of s
          set ss to ss & the skipped of s
          set ss to ss & the name of the base layout of s
          set ss to ss & the object text of the default title item of s
          set ss to ss & the object text of the default body item of s
          set ss to ss & the presenter notes of s

          set AppleScript's text item delimiters to valueDelim
          set sd to sd & (ss as string)
          set ss to {}
        end repeat

        set AppleScript's text item delimiters to slideDelim
        return sd as string
      end tell
    `)
    .then(result => result.split(slideDelimiter))
    .then(slides => slides.map(slide => {
      const [number, skipped, layout, title, body, notes] = slide.split(valDelimiter);
      return {
        number: Number.parseInt(number),
        skipped: skipped === 'true',
        layout,
        title,
        body,
        notes
      };
    }));
  }
}
