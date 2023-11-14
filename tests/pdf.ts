import test from 'ava';
import { Pdf, Disk } from '../src/index.js';

test('pdf extract', async t => {
  const file = Disk.dir('tests/fixtures').path('test.pdf');
  const output = await Pdf.extract(file, { disableCombineTextItems: false, normalizeWhitespace: true});
  t.is(output.filename, file);
  t.is(output.pages[0].content.pop()?.str, "Presenter notes for title slide");
});
