import test from 'ava';
import { Html } from '../src/index.js';

const html = `
<html>
<body>
<h2>Title</h2>
<p>Body</p>
<p>More body</p>
<p><img src="img.jpg" alt="alt text" /> Image here</p>
<p>Transcript</p>
<span>Doesn't appear</span>
<p>More transcript</p>
</body>
</html>
`;

test('cheerio html', async t => {
  const extracted = await Html.extract(html, {
    title: 'h2',
    body: 'p:has(~ p>img) | html',
    image:  'p>img | attr:src',
    alt: 'p>img | attr:alt',
    transcript: 'p:not(:has(>img), :has(~ p>img)) | html'
  });

  t.is(extracted.body, '<p>Body</p><p>More body</p>');
  t.is(extracted.transcript, '<p>Transcript</p><p>More transcript</p>');
});
