import test from 'ava';
import { Keynote, fs } from "../src/index.js";

test('keynote opens and exports', async t => {
  const path = fs.dir('tests/fixtures').path('test.key');
  const output = fs.dir('tests/output/keynote');

  const k = await Keynote.open(path);
  t.assert(k.file === path);
  t.assert(k.slides.length === 2);  

  await k.export({ path: output.path() });
  t.assert(output.exists('deck.json') === 'file');
  t.assert(output.exists('images') === 'dir');

  t.assert(await k.close());
  t.assert(await Keynote.quit());

  return output.removeAsync();
});
