import test from 'ava';
import { Keynote, fsJetpack } from "../src/index.js";

test.serial('open and parse', async t => {
  const path = fsJetpack.dir('tests/fixtures').path('test.key');
  const k = await Keynote.open(path);
  t.assert(k.file === path);
  t.assert(k.slides.length === 2);

  t.assert(await k.close());
  t.assert(await Keynote.quit());
});

test.serial('json with images', async t => {
  const path = fsJetpack.dir('tests/fixtures').path('test.key');
  const output = fsJetpack.dir('tests/output/keynote');

  const k = await Keynote.open(path);
  await k.export({ path: output.path(), format: 'JSON with images' });
  t.assert(output.exists('deck.json') === 'file');
  t.assert(output.exists('images') === 'dir');

  t.assert(await k.close());
  t.assert(await Keynote.quit());
  return output.removeAsync();
});


test.serial('pdf export', async t => {
  const path = fsJetpack.dir('tests/fixtures').path('test.key');
  const output = fsJetpack.dir('tests/output/keynote');

  const k = await Keynote.open(path);
  await k.export({ path: output.path(), format: 'PDF', exportStyle: 'SlideWithNotes' });
  t.assert(output.exists('SlideWithNotes.pdf') === 'file');

  t.assert(await k.close());
  t.assert(await Keynote.quit());

  return output.removeAsync();
});
