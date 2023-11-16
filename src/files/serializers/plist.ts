import plist from 'plist';
import { Serializer } from 'fs-jetpack/types';
import jetpack from 'fs-jetpack';

export const Plist: Serializer<plist.PlistValue, plist.PlistValue> = {
  validate: (data: unknown) => true,
  parse: plist.parse,
  stringify: plist.build,
};

jetpack.setSerializer('.plist', Plist);
