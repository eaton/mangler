import { JsonMap } from '@iarna/toml/index.js';
import { FileFormat } from './file-format.js';
import JSON5 from 'json5';

export const Json: FileFormat = {
  extensions: ['json'],
  parse: JSON.parse,
  stringify: JSON.stringify
};

export const Json5: FileFormat = {
  extensions: ['json5'],
  parse: JSON5.parse,
  stringify: JSON5.stringify
};

export const NdJson: FileFormat<JsonMap[]> = {
  extensions: ['ndjson'],

  parse: function (data: string) {
    const lines = data.trim().split('\n');
    return lines.map((line) => JSON.parse(line));
  },

  stringify: function (data: unknown[]): string {
    return data.map((item) => JSON.stringify(item, undefined, 0)).join('\n');
  },
};
