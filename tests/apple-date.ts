import test from 'ava';
import { Dates } from '../src/index.js';

// Gotta iron out timezone correction here, or it'll keep biting us.
test('parse apple date', t => {
  const dateTime = Dates.fromApple('Monday, March 11, 2013 at 11:08:06 AM');
  t.is(dateTime.toISOString().split('T')[0], '2013-03-11');
});
