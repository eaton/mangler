import { parse, stringify } from 'yaml';
import { SimpleSerializer } from './simple-serializer.js';
import jetpack from 'fs-jetpack';

export const Yaml: SimpleSerializer = {
  extensions: ['yaml', 'yml'],
  validate: (data: unknown) => true,
  parse,
  stringify,
};

jetpack.setSerializer('.yml', Yaml);
jetpack.setSerializer('.yaml', Yaml);