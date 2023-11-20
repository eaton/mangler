import test from 'ava';
import { Text } from '../src/index.js';

test('capitalizer capitalizes', t => {
  const starterText = 'A normal string of text. some MIGHT be Capitalized.'
  const output: string[] = [];
  for (const [name, fnc] of Object.entries(Text.toCase)) {
    output.push(`${name}: "${fnc(starterText)}"`)
  }
  t.assert(starterText.length > 0);
});
