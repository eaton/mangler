import test from 'ava';
import { Disk, download } from '../src/index.js';

test('simple download', async t => {
  const output = Disk.dir('tests/output/download');
  await download('https://example.com', output.path('example.html'));
  t.assert(output.exists('example.html'));
  output.remove('example.html');
});
