import is from '@sindresorhus/is';
import * as cheerio from 'cheerio';
import {
  cheerioJsonMapper,
  getScope,
  PipeFnMap,
  JsonTemplate,
} from 'cheerio-json-mapper';

export type CheerioInput = Parameters<typeof cheerio.load>[0];
export type CheerioExtractTemplate = JsonTemplate;

/**
 * A simple wrapper for Cheerio's `load` function
 */
export function toCheerio(
  content: CheerioInput,
  options?: cheerio.CheerioOptions,
  isDocument?: boolean,
) {
  return cheerio.load(content, options, isDocument);
}

/**
 * Uses cheerio to extract structured data from markup
 */
export async function extract<T extends string | JsonTemplate>(
  input: string | Buffer | cheerio.AnyNode | cheerio.Cheerio<cheerio.AnyNode>,
  template: T,
): Promise<MappedReturn<T>> {
  const htmlOrNode = input instanceof Buffer ? input.toString() : input;
  return cheerioJsonMapper(htmlOrNode, template, { pipeFns }).then(
    (results) => results as MappedReturn<T>,
  )
}

const pipeFns: PipeFnMap = {
  html: ({ $scope, selector, opts, value }) => getScope($scope, selector, opts).toString(),
  shift: ({ value }) => (Array.isArray(value) ? value.shift() : void 0),
  pop: ({ value }) => (Array.isArray(value) ? value.pop() : void 0),
  index: ({ value, args }) => {
    console.log(value, args);
    if (Array.isArray(value)) {
      const [idx] = args ?? [];
      if (is.numericString(idx)) {
        return value[Number.parseInt(idx)];
      }
      return void 0;
    }
    return void 0;
  },
  replace: ({ value, args }) =>
    typeof value === 'string'
      ? value.replaceAll(
          (args?.[0] as string) ?? '',
          (args?.[1] as string) ?? '',
        )
      : value,
  split: ({ value, args }) => {
    if (value !== null && value !== void 0) {
      const [arg1] = args ?? [];
      const joiner = arg1?.toString() ?? ' ';
      return value
        .toString()
        .split(joiner)
        .map((value) => value.trim());
    }
    return void 0;
  },
};

type MappedReturn<T extends string | unknown[] | Record<string, unknown>> =
  T extends string
    ? unknown
    : T extends unknown[]
    ? unknown[]
    : Record<string, unknown>;
