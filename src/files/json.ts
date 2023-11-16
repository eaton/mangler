import { JsonMap } from '@iarna/toml/index.js';
import { SimpleSerializer } from './simple-serializer.js';
import JSON5 from 'json5';
import { isArray } from '@sindresorhus/is';
import jetpack from 'fs-jetpack';

export const Json: SimpleSerializer = {
  extensions: ['json'],
  validate: (data: unknown) => true,
  parse: JSON.parse,
  stringify: JSON.stringify,
};

export const Json5: SimpleSerializer = {
  extensions: ['json5'],
  validate: (data: unknown) => true,
  parse: JSON5.parse,
  stringify: JSON5.stringify,
};

/**
 * Note that we use a relatively inefficient all-at-once approach to parsing
 * NDJson here. NDJson is newline delimited precisely so that it can be processed
 * as a stream, so this is suboptimal even though it generates correct output.
 *
 * That said, the parse/stringify nomenclature fits our quick-and-dirty approach
 * to file format handling, so it's a win for now. Just don't lean on it for any
 * performance intensive stuff.
 */
export const NdJson: SimpleSerializer<unknown, JsonMap[]> = {
  extensions: ['ndjson'],
  validate: (data: unknown) => isArray(data),
  parse: function (data: string) {
    const lines = data.trim().split('\n');
    return lines.map((line) => JSON.parse(line));
  },

  stringify: function (data: unknown[]): string {
    return data.map((item) => JSON.stringify(item, undefined, 0)).join('\n');
  },
};

jetpack.setSerializer('.json5', Json5);
jetpack.setSerializer('.ndjson', NdJson);