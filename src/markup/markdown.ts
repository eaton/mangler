import { parse } from 'marked';
import { toText as htmlToText } from './html.js'
import TurndownService from 'turndown';

export function toHtml(input: string) {
  return parse(input);
}

export function toText(input: string) {
  return htmlToText(parse(input));
}
export function fromHtml(input: string) {
  const turndownService = new TurndownService();
  return turndownService.turndown(input);
}