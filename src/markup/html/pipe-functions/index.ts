export {
  PipeFn as CheerioPipeFunction,
  PipeInput as CheerioPipeInput,
  getScope,
} from 'cheerio-json-mapper';

import {
  split,
  pop,
  shift,
  index,
  count,
  join,
  first,
  last,
} from './array-pipes.js';
import { contents, html, outerHtml } from './html-pipes.js';

export function getPipeFns() {
  return {
    split,
    pop,
    shift,
    index,
    count,
    join,
    first,
    last,
    contents,
    html,
    outerHtml,
  };
}
