import { parse, stringify } from 'ini';
import { Serializer } from '@eatonfyi/fs-jetpack/types';
import jetpack from '@eatonfyi/fs-jetpack';

export const Ini: Serializer = {
  parse,
  stringify,
};

jetpack.setSerializer('.ini', Ini);
