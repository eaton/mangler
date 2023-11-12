import matter, { GrayMatterFile } from 'gray-matter';
import { SimpleSerializer } from './simple-serializer.js';

export const Frontmatter: SimpleSerializer<GrayMatterFile<string>> = {
  extensions: ['md'],
  parse: (input: string) => matter(input),
  stringify: (
    input: GrayMatterFile<string>,
    options: Record<string, unknown>,
  ) => {
    const { content, data } = input;
    return matter.stringify(content, data);
  },
};
