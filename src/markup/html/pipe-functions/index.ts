export {
  PipeFn as CheerioPipeFunction,
  PipeInput as CheerioPipeInput,
  getScope
} from 'cheerio-json-mapper'

import { split, pop, shift, index } from './array-pipes.js';
import { html, outerHtml } from './html-pipes.js';

export function getPipeFns() {
  return { 
    split, pop, shift, index,
    html, outerHtml
  }
}