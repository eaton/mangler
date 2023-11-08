import matter, { GrayMatterFile } from 'gray-matter';
import { FileFormat } from './file-format.js';

export const Frontmatter: FileFormat<GrayMatterFile<string>> = {
  extensions: ['md'],
  parse: (input: string) => matter(input),
  stringify: (input: GrayMatterFile<string>, options: Record<string, unknown>) => {
    const { content, data } = input;
    return matter.stringify(content, data);
  }
};
