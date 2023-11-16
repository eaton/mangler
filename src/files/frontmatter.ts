import matter, { GrayMatterFile } from 'gray-matter';
import { SimpleSerializer } from './simple-serializer.js';
import jetpack from 'fs-jetpack';

export const Frontmatter: SimpleSerializer<unknown, GrayMatterFile<string>> = {
  extensions: ['md', 'markdown'],
  validate: (data: unknown) => true,
  parse: (input: string) => matter(input),
  stringify: (
    input: GrayMatterFile<string>,
    options: Record<string, unknown>,
  ) => {
    const { content, data } = input;
    return matter.stringify(content, data);
  },
};

jetpack.setSerializer('.md', Frontmatter);
jetpack.setSerializer('.markdown', Frontmatter);
