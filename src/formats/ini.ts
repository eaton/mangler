import { parse, stringify } from 'ini';
import { FileFormat } from './file-format.js';

export const Ini: FileFormat = {
  extensions: ['ini'],
  parse,
  stringify,
};
