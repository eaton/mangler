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

