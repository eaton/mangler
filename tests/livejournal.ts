import test from 'ava';
import { Livejournal } from '../src/index.js';

test('user links', t => {
  const inputs = [
    '<lj user=name>',
    '<lj user=\'name\'>',
    '<lj user="name">',
    '<lj user=name />',
    '<lj user=\'name\' />',
    '<lj user="name" />',
  ];
  const expected = `<a class="lj-user" href="https://livejournal.com/users/name">name</a>`;

  for (const input of inputs) {
    t.is(
      Livejournal.userToLink(input),
      expected
    );  
  }
});

test('lj cut breaker', t => {
  const inputs = [
    'teaser <lj-cut> body',
    'teaser <lj-cut /> body'
  ];
  const teaser = `teaser `;
  const body = `teaser  body`;

  for (const input of inputs) {
    t.is(Livejournal.cutTeaser(input), teaser);
    t.is(Livejournal.cutBody(input), body);
  }
});

test('lj cut breaker with text', t => {
  const inputs = [
    'teaser <lj-cut text=text> body',
    'teaser <lj-cut text="text"> body'
  ];
  const teaser = `teaser <span class="lj-cut">text</span>`;
  const body = `teaser  body`;

  for (const input of inputs) {
    t.is(Livejournal.cutTeaser(input), teaser);
    t.is(Livejournal.cutBody(input), body);
  }
});

test('lj cut wrapper', t => {
  const inputs = [
    'teaser <lj-cut>body</lj-cut> teaser',
  ];
  const teaser = `teaser <span class="lj-cut"></span> teaser`;
  const body = `teaser <span class="lj-uncut">body</span> teaser`;

  for (const input of inputs) {
    t.is(Livejournal.cutTeaser(input), teaser);
    t.is(Livejournal.cutBody(input), body);
  }
});

test('lj cut wrapper with text', t => {
  const inputs = [
    'teaser <lj-cut text=text>body</lj-cut> teaser'
  ];
  const teaser = `teaser <span class="lj-cut">text</span> teaser`;
  const body = `teaser <span class="lj-uncut">body</span> teaser`;

  for (const input of inputs) {
    t.is(Livejournal.cutTeaser(input), teaser);
    t.is(Livejournal.cutBody(input), body);
  }
});
