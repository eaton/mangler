import test from 'ava';
import { Keynote, fsJetpack } from "../src/index.js";

test('keynote opens and exports', async t => {
  const path = fsJetpack.dir('tests/fixtures').path('test.key');
  const output = fsJetpack.dir('tests/output/keynote');

  const k = await Keynote.open(path);
  t.assert(k.file === path);
  t.assert(k.slides.length === 2);  

  await k.export({ path: output.path(), format: 'JSON with images' });
  t.assert(output.exists('deck.json') === 'file');
  t.assert(output.exists('images') === 'dir');

  t.assert(await k.close());
  t.assert(await Keynote.quit());

  return output.removeAsync();
});
