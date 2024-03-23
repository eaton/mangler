import { parse } from 'marked';
import { toText as htmlToText } from './html/index.js';
import TurndownService from 'turndown';

export function toHtml(input: string) {
  return parse(input, { gfm: true });
}

export function toText(input: string) {
  return htmlToText(parse(input));
}
export function fromHtml(input: string, options: TurndownService.Options = {}) {
  const turndownService = new TurndownService({
    hr: '---',
    emDelimiter: '*',
    headingStyle: 'atx',
    bulletListMarker: '-',
    codeBlockStyle: 'fenced',
    ...options,
  });
  return turndownService.turndown(input);
}
