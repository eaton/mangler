import { SimpleSerializer } from './simple-serializer.js';

import { Json, Json5, NdJson } from './json.js';
import { Yaml } from './yaml.js';
import { Csv, Tsv } from './csv.js';
import { Plist } from './plist.js';

export * from './simple-serializer.js';
export * from './json.js';
export * from './yaml.js';
export * from './csv.js';
export * from './plist.js';
export * from './frontmatter.js';
export * from './base64.js';

export function findForFile(extension: string): SimpleSerializer | undefined {
  const ext = extension.startsWith('.') ? extension.slice(1) : extension;
  return [Json, Json5, NdJson, Yaml, Csv, Tsv, Plist].find(ss => ss.extensions.includes(ext.toLocaleLowerCase()));
}