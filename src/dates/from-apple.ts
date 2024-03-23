import { parse } from 'date-fns';
/**
 * Parses a string in Apple's "Monday, March 11, 2013 at 11:08:06 AM" date format,
 * returns a JS date object.
 */
export function fromApple(input: string) {
  return parse(input, "EEEE, MMMM d, yyyy' at 'h:mm:ss aa", 0);
}
