import { FileFormat } from './file-format.js';
import { stringify } from 'csv-stringify/sync';
import { parse } from 'csv-parse/sync';
import is from '@sindresorhus/is';

export const Csv: FileFormat = {
  extensions: ['csv'],
  parse: (data: string) => parse(data, { delimiter: ',' }),
  stringify: (input: unknown[]) => stringify(input, { delimiter: ',', objectMode: is.object(input[0]) })
};

export const Tsv: FileFormat = {
  extensions: ['tsv'],
  parse: (data: string) => parse(data, { delimiter: '\t' }),
  stringify: (input: unknown[]) => stringify(input, { delimiter: '\t', objectMode: is.object(input[0]) })
};
