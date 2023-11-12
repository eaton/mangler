import test from 'ava';
import { Pdf, fsJetpack } from '../src/index.js';

test('pdf extract', async t => {
  const file = fsJetpack.dir('tests/fixtures').path('test.pdf');
  const output = await Pdf.extract(file);
  console.log(output.pages[0]);
  t.is(output.filename, file);
});
