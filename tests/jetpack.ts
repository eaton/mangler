import test from 'ava';
import { Disk } from '../src/index.js';

test('auto-serialize yaml', t => {
  const data = { content: 'test', data: { header: 'test' }};
  const output = Disk.dir('tests/output/jetpack');
  output.write('test.yaml', data);
  t.assert(output.exists('test.yaml'));
});

test('auto-serialize and parse yaml', t => {
  const data = { content: 'test', data: { header: 'test' }};
  const output = Disk.dir('tests/output/jetpack');

  output.write('test.yaml', data);
  t.assert(output.exists('test.yaml'));

  const raw = output.read('test.yaml');
  t.is(raw, "content: test\ndata:\n  header: test\n");

  const readFile = output.read('test.yaml', "auto");
  t.deepEqual(readFile, data);

  output.remove();
});
