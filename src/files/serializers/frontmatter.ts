import matter, { GrayMatterFile } from 'gray-matter';
import { Serializer } from 'fs-jetpack/types';
import jetpack from 'fs-jetpack';
import { isObject } from '@sindresorhus/is';

type FrontmatterInput = { content: string, data: Record<string, unknown> };

export const Frontmatter: Serializer<
FrontmatterInput,
  GrayMatterFile<string>
> = {
  validate: (data: unknown) => isObject(data),
  parse: (input: string) => matter(input),
  stringify: (input: FrontmatterInput) => {
    const { content, data } = input;
    return matter.stringify(content, data);
  },
};

jetpack.setSerializer('.md', Frontmatter);
jetpack.setSerializer('.markdown', Frontmatter);
