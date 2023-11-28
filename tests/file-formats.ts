import test from 'ava';
import { Tsv, NdJson, Frontmatter, Plist } from '../src/index.js';

test('ndjson lifecycle', t => {
  const input = [
    { key: 'string1', value: 12345 },
    { key: 'string2', value: 67890 },
  ];
  const serialized = NdJson.stringify(input);
  t.deepEqual(NdJson.parse(serialized), input);
});

test('tsv lifecycle', t => {
  const input = [
    { key: 'string1', value: 12345 },
    { key: 'string2', value: 67890 },
  ];
  const serialized = Tsv.stringify(input);
  t.deepEqual(Tsv.parse(serialized), input);
});

test.skip('tsv arrays', t => {
  const input = [
    ['string1', 12345],
    ['string2', 67890],
  ];
  const serialized = Tsv.stringify(input);
  t.deepEqual(Tsv.parse(serialized), input);  // this should pass in another param, but ugh
});

test('plist lifecycle', t => {
  const input = [
    { key: 'string1', value: 12345 },
    { key: 'string2', value: 67890 },
  ];
  const serialized = Plist.stringify(input);
  t.deepEqual(Plist.parse(serialized), input);
});

test('frontmatter roundtrip', t => {
  const input = {
    data: {
      title: 'title',
      date: '2000-01-01',
      layout: 'page',
      tags: ['tag1', 'tag2'],
    },
    content: 'Full content',
  };
  const serialized = Frontmatter.stringify(input);
  const output = Frontmatter.parse(serialized);
  
  t.deepEqual(output.data, input.data);
  t.deepEqual(output.content.trim(), input.content.trim());
});

