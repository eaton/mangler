import { parse, stringify } from 'ini';
import { Serializer } from 'fs-jetpack/types';
import jetpack from 'fs-jetpack';

export const Ini: Serializer = {
  parse,
  stringify,
};

jetpack.setSerializer('.ini', Ini);
