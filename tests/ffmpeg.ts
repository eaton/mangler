import { ffmpeg, fsJetpack } from "../src/index.js";
import test from 'ava';


test('gif to webp', t => {
  const input = fsJetpack.dir('tests/fixtures');
  const output = fsJetpack.dir('tests/output/ffmpeg');
  const outpath = output.path('animated.webp');

  const stream = fsJetpack.createWriteStream(outpath, { autoClose: true });

  ffmpeg(input.path('animated.gif'))
    .toFormat('webp')
    .output(stream)
    .run();
  
    const info = output.inspect(outpath);
    console.log(info);
    t.assert(info && info.size > 0);
    output.remove();
});
