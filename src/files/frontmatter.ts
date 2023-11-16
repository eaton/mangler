import matter, { GrayMatterFile } from 'gray-matter';
import { Serializer } from 'fs-jetpack/types';
import jetpack from 'fs-jetpack';
import { isObject } from '@sindresorhus/is';

export const Frontmatter: Serializer<GrayMatterFile<string>, GrayMatterFile<string>> = {
  validate: (data: unknown) => isObject(data),
  parse: (input: string) => matter(input),
  stringify: (input: GrayMatterFile<string>) => {
    const { content, data } = input;
    return matter.stringify(content, data);
  },
};

jetpack.setSerializer('.md', Frontmatter);
jetpack.setSerializer('.markdown', Frontmatter);
