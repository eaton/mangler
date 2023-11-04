import test from 'ava';
import { Sanity } from '../src/index.js';

test('html to default schema', async t => {
  const input = `<h1>h1</h1><h2>h2</h2><h3>h3</h3><h4>h4</h4><p><em>em</em> <strong>strong</strong> <a href="http://example.com">a</a></p>`;
  const blocks = Sanity.fromHtml(input);
  const output = Sanity.toHtml(blocks);

  t.is(input, output);
});

test('ul to blocks', async t => {
  const input = '<ul><li>item 1</li><li>item 2</li></ul>';
  const blocks = Sanity.fromHtml(input);
  const output = Sanity.toHtml(blocks);
  t.is(input, output);
});

test('html to plaintext schema', async t => {
  const input = `<h1>h1</h1><h2>h2</h2><h3>h3</h3><h4>h4</h4><p><em>em</em> <strong>strong</strong> <a href="http://example.com">a</a></p>`;
  const blocks = Sanity.fromHtml(input, Sanity.schemas.plainText);
  const output = Sanity.toHtml(blocks);
  t.is(output, '<p>h1</p><p>h2</p><p>h3</p><p>h4</p><p>em strong a (http://example.com)</p>');
});

test('html to styled schema', async t => {
  const input = '<p>This is some <em>text</em> with a <a href="https://example.com">bit</a> of <strong>formatting</strong>.</p>';
  const blocks = Sanity.fromHtml(input, Sanity.schemas.styledText);
  const output = Sanity.toHtml(blocks);
  t.is(input, output);
});

test('plaintext to blocks', async t => {
  const input = `

  para 1
  
  para
  2

para
3
  `;
  const blocks = Sanity.fromText(input);
  const output = Sanity.toHtml(blocks);
  t.is(output, '<p>para 1</p><p>para 2</p><p>para 3</p>');
});
