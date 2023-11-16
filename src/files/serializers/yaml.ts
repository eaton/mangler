import { parse, stringify } from 'yaml';
import { Serializer } from 'fs-jetpack/types';
import jetpack from 'fs-jetpack';

export const Yaml: Serializer = {
  parse,
  stringify,
};

jetpack.setSerializer('.yml', Yaml);
jetpack.setSerializer('.yaml', Yaml);
