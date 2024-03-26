import matter, { GrayMatterFile } from 'gray-matter';
import { encode, decode } from 'entities';
import { Serializer } from '@eatonfyi/fs-jetpack/types';
import jetpack from '@eatonfyi/fs-jetpack';
import { isObject } from '@sindresorhus/is';

export type FrontmatterInput = {
  content: string;
  data: Record<string, unknown>;
};

export const Frontmatter: Serializer<
  FrontmatterInput,
  GrayMatterFile<string>
> = {
  validate: (data: unknown) => isObject(data),
  parse: (input: string) => matter(input),
  stringify: (input: FrontmatterInput) => {
    const { content, data } = input;

    // Some exotic characters ... caused problems. We're UTF encoding and then decoding
    // by default, which — distressingly — seemed to solve the problems.
    const scrubbed = decode(encode(content, { level: 1, mode: 0 }), {
      level: 1,
      mode: 0,
    });

    return matter.stringify(scrubbed, data);
  },
};

jetpack.setSerializer('.md', Frontmatter);
jetpack.setSerializer('.markdown', Frontmatter);
