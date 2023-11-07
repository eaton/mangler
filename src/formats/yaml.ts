import { parse, stringify } from 'yaml';
import { FileFormat } from './file-format.js';

export const Yaml: FileFormat = {
  extensions: ['yaml', 'yml'],
  parse,
  stringify,
};
