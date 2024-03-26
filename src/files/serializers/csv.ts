import { stringify, Options as StringifyOptions } from 'csv-stringify/sync';
import { parse, Options as ParseOptions } from 'csv-parse/sync';
import is, { isArray } from '@sindresorhus/is';
import { Serializer } from '@eatonfyi/fs-jetpack/types';
import jetpack from '@eatonfyi/fs-jetpack';

const stringifyOpt: StringifyOptions = {};

const parseOpt: ParseOptions = {
  autoParse: true,
  cast: true,
};

export const Csv: Serializer = {
  validate: (data: unknown) => isArray(data),
  parse: (data: string, columns: boolean = true) =>
    parse(data, { ...parseOpt, delimiter: ',', columns }),
  stringify: (input: unknown[]) =>
    stringify(input, {
      ...stringifyOpt,
      delimiter: ',',
      objectMode: is.plainObject(input[0]),
      header: is.plainObject(input[0]),
    }),
};

export const Tsv: Serializer = {
  validate: (data: unknown) => isArray(data),
  parse: (data: string, columns: boolean = true) =>
    parse(data, { ...parseOpt, delimiter: '\t', columns }),
  stringify: (input: unknown[]) =>
    stringify(input, {
      ...stringifyOpt,
      delimiter: '\t',
      objectMode: is.plainObject(input[0]),
      header: is.plainObject(input[0]),
    }),
};

jetpack.setSerializer('.csv', Csv);
jetpack.setSerializer('.tsv', Tsv);
