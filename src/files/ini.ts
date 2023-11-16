import { parse, stringify } from 'ini';
import { SimpleSerializer } from './simple-serializer.js';
import jetpack from 'fs-jetpack';

export const Ini: SimpleSerializer = {
  extensions: ['ini'],
  validate: (data: unknown) => true,
  parse,
  stringify,
};

jetpack.setSerializer('.ini', Ini);
