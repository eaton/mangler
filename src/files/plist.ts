import plist from 'plist';
import { SimpleSerializer } from './simple-serializer.js';
import jetpack from 'fs-jetpack';

export const Plist: SimpleSerializer<unknown, plist.PlistValue> = {
  extensions: ['plist'],
  validate: (data: unknown) => true,
  parse: plist.parse,
  stringify: plist.build,
};

jetpack.setSerializer('.plist', Plist);