import test from 'ava';
import { Urls } from '../src/index.js';

test('bare domain', async t => {
  const input = 'example.com';
  t.is(Urls.linkify(input), '<a href="https://example.com">example.com</a>');
});

test('long url', async t => {
  const input = 'http://www.example.com/some-very-long-url/with-lots-of/extras.html?search=1';
  t.is(
    Urls.linkify(input),
    '<a href="http://www.example.com/some-very-long-url/with-lots-of/extras.html?search=1">example.com/some-very-long-url/with-lots…</a>'
  );
});

test('mixed urls', async t => {
  const input = 'Text with link.com, user@mail.com, and <em>html</em>';
  t.is(
    Urls.linkify(input),
    'Text with <a href="https://link.com">link.com</a>, <a href="mailto:user@mail.com">user@mail.com</a>, and <em>html</em>'
  );
});

test('already linkified', async t => {
  const input = '<a href="https://example.com">example.com</a>';
  t.is(
    Urls.linkify(input),
    '<a href="https://example.com">example.com</a>'
  );
});

