import test from 'ava';
import { Keynote, Disk } from "../src/index.js";

test.serial('open and parse', async t => {
  const path = Disk.dir('tests/fixtures').path('test.key');
  const k = await Keynote.open(path);
  t.assert(k.file === path);
  t.assert(k.slides.length === 3);

  t.assert(await k.close());
  t.assert(await Keynote.quit());
});

test.serial('json with images', async t => {
  const path = Disk.dir('tests/fixtures').path('test.key');
  const output = Disk.dir('tests/output/keynote');

  const k = await Keynote.open(path);
  await k.export({ path: output.path(), format: 'JSON with images' });
  t.assert(output.exists('deck.json') === 'file');
  t.assert(output.exists('images') === 'dir');

  t.assert(await k.close());
  t.assert(await Keynote.quit());
  return output.removeAsync();
});


test.serial('pdf export', async t => {
  const path = Disk.dir('tests/fixtures').path('test.key');
  const output = Disk.dir('tests/output/keynote');

  const k = await Keynote.open(path);
  await k.export({ path: output.path(), format: 'PDF', exportStyle: 'SlideWithNotes' });
  t.assert(output.exists('SlideWithNotes.pdf') === 'file');

  t.assert(await k.close());
  t.assert(await Keynote.quit());

  return output.removeAsync();
});

test('alter notes', async t => {
  const path = Disk.dir('tests/fixtures').path('test.key');
  const k = await Keynote.open(path);
  const oldNotes = k.slides[0].notes;
  
  t.notThrowsAsync(k.setNotes(1, 'Updated notes'));
  await k.setNotes(1, oldNotes);

  t.assert(await k.close());
  t.assert(await Keynote.quit());
});

test.skip('single slide movie', async t => {
  const path = Disk.dir('tests/fixtures').path('test.key');
  const output = Disk.dir('tests/output/keynote');

  const k = await Keynote.open(path);
  const script = await k.exportSlideAnimation(2, 0, { path: output.path() });
  console.log(script);
  t.assert(script !== undefined);

  t.assert(await k.close());
  t.assert(await Keynote.quit());

  return output.removeAsync();
});
