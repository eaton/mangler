import { parse, stringify } from 'iarna__toml';
import { FileFormat } from './file-format.js';

export const Toml: FileFormat = {
  extensions: ['toml'],
  parse,
  stringify,
};
