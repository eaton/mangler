import { SimpleSerializer } from "./simple-serializer.js";

export const Base64: SimpleSerializer<string> = {
  extensions: [],
  parse: (input: string) => Buffer.from(input, 'base64').toString('utf8'),
  stringify: (input: string) => Buffer.from(input, 'utf-8').toString('base64')
};
