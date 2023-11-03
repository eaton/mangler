import pkg from 'textile-js';
const { parse } = pkg;
import { toText as htmlToText } from './html.js'

export function toHtml(input: string) {
  return parse(input);
}

export function toText(input: string) {
  return htmlToText(parse(input));
}