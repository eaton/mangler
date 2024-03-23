import * as cheerio from 'cheerio';
import { getPipeFns } from './pipe-functions/index.js';
import { cheerioJsonMapper, JsonTemplate } from 'cheerio-json-mapper';

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
  return cheerioJsonMapper(htmlOrNode, template, {
    pipeFns: getPipeFns(),
  }).then((results) => results as MappedReturn<T>);
}

type MappedReturn<T extends string | unknown[] | Record<string, unknown>> =
  T extends string
    ? unknown
    : T extends unknown[]
    ? unknown[]
    : Record<string, unknown>;
