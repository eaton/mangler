import { parse, stringify } from 'yaml';
import { Serializer } from '@eatonfyi/fs-jetpack/types';
import jetpack from '@eatonfyi/fs-jetpack';

export const Yaml: Serializer = {
  parse,
  stringify,
};

jetpack.setSerializer('.yml', Yaml);
jetpack.setSerializer('.yaml', Yaml);
