import plist from 'plist';
import { SimpleSerializer } from './simple-serializer.js';

export const Plist: SimpleSerializer<plist.PlistValue> = {
  extensions: ['plist'],
  parse: plist.parse,
  stringify: plist.build,
};
