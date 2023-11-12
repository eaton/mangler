import { parse, stringify } from 'yaml';
import { SimpleSerializer } from './simple-serializer.js';

export const Yaml: SimpleSerializer = {
  extensions: ['yaml', 'yml'],
  parse,
  stringify,
};
