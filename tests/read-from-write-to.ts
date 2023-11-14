import test from 'ava';
import { Disk, readFrom, writeTo } from '../src/index.js';
import { readFromAsync, writeToAsync } from '../dist/index.js';

test('read', t => {
  const input = Disk.dir('tests/fixtures');
  const yaml = readFrom(input.path('test.yaml'));
  const json = readFrom(input.path('test.json'));
  t.deepEqual(yaml, json);
});

test('write', t => {
  const output = Disk.dir('tests/output/serializers');
  const data = { simple: test, arr: [ 1, 2, 3 ] };

  writeTo(output.path('write.json'), data);
  const size = output.inspect('write.json')?.size;
  t.assert(size && size > 0);
});


test('async read', async t => {
  const input = Disk.dir('tests/fixtures');
  const yaml = await readFromAsync(input.path('test.yaml'));
  const json = await readFromAsync(input.path('test.json'));
  t.deepEqual(yaml, json);
  return Promise.resolve();
});

test('async write', async t => {
  const output = Disk.dir('tests/output/serializers');
  const data = { simple: test, arr: [ 1, 2, 3 ] };

  const size = await writeToAsync(output.path('write.json'), data)
    .then(() => output.inspectAsync('write.json'))
    .then(inspect => inspect?.size);

  t.assert(size && size > 0);
  return output.remove();
});
