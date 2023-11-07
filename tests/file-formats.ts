import test from 'ava';
import { Tsv, NdJson } from '../src/index.js';

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

test('tsv arrays', t => {
  const input = [
    ['string1', 12345],
    ['string2', 67890],
  ];
  const serialized = Tsv.stringify(input);
  t.deepEqual(Tsv.parse(serialized, false), input);
});

