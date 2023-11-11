import slugify from '@sindresorhus/slugify';

export function toSlug(input: string) {
  return slugify(input, {
    decamelize: true,
    lowercase: true,
    separator: '-',
  });
}
