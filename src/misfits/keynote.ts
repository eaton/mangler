import { runAppleScript } from 'run-applescript';
import { Text, fs } from '../index.js';

type SlideInfo = {
  number: number,
  skipped: boolean,
  layout: string,
  title: string,
  body: string,
  notes: string
}

type DeckInfo = {
  id: string,
  name: string,
  file: string,
  theme: string,
  height: number,
  width: number,
  slides: SlideInfo[],
}

export interface KeynoteExportOptions {
  path?: string,
  format?: 'HTML' | 'QuickTime movie' | 'PDF' | 'slide images' | 'Microsoft PowerPoint' | 'Keynote 09';
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
  private _deck: DeckInfo | undefined;

  private constructor() {};

  static async open(file: string) {
    const k = new Keynote();
    await k.open(file);
    return k;
  }

  async open(file: string) {
    await runAppleScript(`tell application "Keynote" to open the POSIX file "${file}"`)
      .then(() => this.deckInfo(true));
  }

  async closeFrontmost() {
    this._deck = undefined;
    return runAppleScript('tell application "Keynote" to close the front document')
  }

  async deckInfo(force = false) {
    if (!this._deck || force) {
      this._deck = {
        id: await runAppleScript('tell application "Keynote" to get the id of the front document'),
        name: await runAppleScript('tell application "Keynote" to get the name of the front document'),
        file: await runAppleScript('tell application "Keynote"\n  set p to the file of the front document\n  return the POSIX path of p\nend tell'),
        theme: await runAppleScript('tell application "Keynote" to get the name of the document theme of the front document'),
        height: await runAppleScript('tell application "Keynote" to get the height of the front document').then(Number.parseInt),
        width: await runAppleScript('tell application "Keynote" to get the width of the front document').then(Number.parseInt),
        slides: []
      };
    }
    return Promise.resolve(this._deck);
  }

  async currentSlide(): Promise<number> {
    return runAppleScript(`tell application "Keynote" to return the current slide of the front document`).then(Number.parseInt);
  }

  async slideCount() {
    return runAppleScript(`tell application "Keynote" to return the count of every slide of the front document`).then(Number.parseInt);
  }

  async gotoSlide(slide: number) {
    return runAppleScript(`tell application "Keynote" to set current slide of the front document to slide ${slide} of the front document`);
  }

  async loadSlides(force = true) {
    await this.deckInfo();

    if (!this._deck || this._deck.slides.length === 0 || force) {
      const slideCount = await this.slideCount();
      for (let s = 1; s <= slideCount; s++) {
        await this.gotoSlide(s);
        this._deck!.slides.push(await this.slideInfo());
      }
    }

    return this._deck?.slides ?? [];
  }

  async slideInfo(): Promise<SlideInfo> {
    const details = {
      number: await runAppleScript('tell application "Keynote" to get the slide number of the current slide of the front document').then(Number.parseInt),
      skipped: await runAppleScript('tell application "Keynote" to get the skipped of the current slide of the front document').then(v => v === 'true'),
      layout: await runAppleScript('tell application "Keynote" to get the name of the base layout of the current slide of the front document'),
      title: await runAppleScript('tell application "Keynote" to get the object text of the default title item of the current slide of the front document'),
      body: await runAppleScript('tell application "Keynote" to get the object text of the default body item of the current slide of the front document'),
      notes: await runAppleScript('tell application "Keynote" to get the presenter notes of the current slide of the front document'),
    };
    return Promise.resolve(details);
  }

  async export(options: KeynoteExportOptions = {}) {
    const deckInfo = await this.deckInfo();
    const output = fs.dir('output/' + deckInfo.name.replace('.key', ''));
    console.log('Exporting slides…')

    const defaults: KeynoteExportOptions = {
      path: output.path(),
      format: 'slide images',
      exportStyle: 'IndividualSlides',
      imageFormat: 'JPEG',
      skippedSlides: true,
    }

    let { format, path, ...opt } = { ...defaults, ...options };
  
    switch (format) {
      case 'slide images':
        path = output.dir('slides').path();
        break;
      case 'HTML':
        path = output.dir('html').path();
        break;
      case 'PDF':
        path = output.path() + '/' + opt.exportStyle + '.pdf'
        break;
      case 'Keynote 09':
        path = output.path() + '/' + opt.exportStyle + '.key'
        break;
      case 'Microsoft PowerPoint':
        path = output.path() + '/' + opt.exportStyle + '.pptx'
        break;
    }

    await this.gotoSlide(0);

    // Construct the applescript snippet    
    let scr = '';
    scr += `tell application "Keynote"\n`;
    scr += `  export the front document as ${format} to POSIX file "${path}"`;
    if (Object.entries(opt).length) {
      scr += ' with properties { ' + Object.entries(opt).map(([k, v]) => Text.noCase(k) + ':' + v).join(', ') + ' } \n';
    }
    scr += `end tell`;
    return runAppleScript(scr);
  }

  async exportAll(directory = 'output') {
    const deck = await this.deckInfo(true);
    await this.loadSlides();

    // Need to pass along the output directory to these exports
    await this.export({ format: 'PDF' });
    await this.export({ format: 'PDF', exportStyle: 'SlideWithNotes' });
    await this.export({ format: 'slide images' });

    const output = fs.dir(directory).dir(deck.name.replace('.key', ''));
    output.file('deck.json', { content: deck, jsonIndent: 2 });
  }
}
