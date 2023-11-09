import plist from 'plist';
import { FileFormat } from './file-format.js';

export const Plist: FileFormat<plist.PlistValue> = {
  extensions: ['plist'],
  parse: plist.parse,
  stringify: plist.build,
};
