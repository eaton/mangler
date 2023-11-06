import { Schema } from '@sanity/schema'
import { ArraySchemaType } from '@sanity/types';
import { htmlToBlocks, normalizeBlock } from '@sanity/block-tools';
import { JSDOM } from 'jsdom';
import { Html } from '../index.js';

export { toPlainText as toText } from '@portabletext/toolkit'
export { toHTML as toHtml } from '@portabletext/to-html'

/**
 * Converts plain text into a collection of unstyled PortableText
 * blocks. Double newlines (`\n\n`) form new paragraphs, single 
 * newlines are collapsed to whitespace.
 */
export function fromText(input: string) {
  return fromHtml(Html.fromText(input, { urls: false }), schemas.plainText);
}

/**
 * Converts simple HTML into Sanity PortableText blocks. Basic sanity
 * tags are supported: h1-h6, blockquote, em, strong, a, and img. Images
 * are treated as standalone paragraphs.
 */
export function fromHtml(input: string, schema?: Record<string, unknown>[]) {
  schema ??= schemas.default;

  const blocks = htmlToBlocks(
    input,
    buildSchema(schema),
    { parseHtml: (html) => new JSDOM(html).window.document }
  );
  return blocks.map(b => normalizeBlock(b));
}

type SanityField = Record<string, unknown> & {
  name: string,
  type: ArraySchemaType<unknown>,
}

export const schemas = {

  default: [
    { type: 'block' },
  ],

  styledText: [{
    type: 'block',
    styles: [{ title: 'Normal', value: 'normal' }],
    lists: [],
    marks: {
      decorators: [
        { title: 'Strong', value: 'strong' },
        { title: 'Emphasis', value: 'em' }
      ],
    }
  }],

  styledTextNoLinks: [{
    type: 'block',
    styles: [{ title: 'Normal', value: 'normal' }],
    lists: [],
    marks: {
      decorators: [
        { title: 'Strong', value: 'strong' },
        { title: 'Emphasis', value: 'em' }
      ],
      annotations: []
    }
  }],


  plainText: [{
    type: 'block',
    styles: [{ title: 'Normal', value: 'normal' }],
    lists: [],
    marks: {
      decorators: [],
      annotations: [],
    }
  }]
}

/**
 * Takes an array of Sanity Studio PortableText block descriptions,
 * wraps them in a dummy content type definition, and compiles them to
 * a schema that can be used with Sanity's htmlToPortableTextBlock
 * function.
 */
export function buildSchema(input: Record<string, unknown>[]) {
  const def = {
    name: 'schema',
    types: [
      {
        type: 'object',
        name: 'content',
        fields: [
          {
            title: 'Body',
            name: 'body',
            type: 'array',
            of: input,
          },
        ],
      },
    ],
  };
  const fields = Schema.compile(def).get('content').fields as SanityField[];
  const schema = fields.find((field) => field.name === 'body')?.type;
  if (!schema) throw new Error('Could not compile schema');
  return schema;
}