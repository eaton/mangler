import plist from 'plist';
import { Serializer } from '@eatonfyi/fs-jetpack/types';
import jetpack from '@eatonfyi/fs-jetpack';

export const Plist: Serializer<plist.PlistValue, plist.PlistValue> = {
  validate: (data: unknown) => true,
  parse: plist.parse,
  stringify: plist.build,
};

jetpack.setSerializer('.plist', Plist);
