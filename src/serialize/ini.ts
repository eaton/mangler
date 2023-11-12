import { parse, stringify } from 'ini';
import { SimpleSerializer } from './simple-serializer.js';

export const Ini: SimpleSerializer = {
  extensions: ['ini'],
  parse,
  stringify,
};
