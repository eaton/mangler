import { CheerioPipeFunction } from './index.js';
import is from '@sindresorhus/is';

export const shift: CheerioPipeFunction = ({ value }) =>
  Array.isArray(value) ? value.shift() : void 0;

export const pop: CheerioPipeFunction = ({ value }) =>
  Array.isArray(value) ? value.pop() : void 0;

export const count: CheerioPipeFunction = ({ value }) =>
  Array.isArray(value) || typeof value === 'string' ? value.length : void 0;

export const split: CheerioPipeFunction = ({ value, args }) => {
  if (value !== null && value !== void 0) {
    const [arg1] = args ?? [];
    const joiner = arg1?.toString() ?? ' ';
    return value
      .toString()
      .split(joiner)
      .map((value) => value.trim());
  } else {
    return void 0;
  }
};

export const join: CheerioPipeFunction = ({ value, args }) => {
  if (Array.isArray(value)) {
    const [arg1] = args ?? [];
    const joiner = arg1?.toString() ?? ' ';
    return value.map((v) => v.toString().trim()).join(joiner);
  } else {
    return void 0;
  }
};

export const first: CheerioPipeFunction = ({ value }) =>
  Array.isArray(value) ? value[0] : void 0;

export const last: CheerioPipeFunction = ({ value }) =>
  Array.isArray(value) ? value[value.length - 1] : void 0;

export const index: CheerioPipeFunction = ({ value, args }) => {
  if (Array.isArray(value)) {
    const [idx] = args ?? [];
    if (is.numericString(idx)) {
      return value[Number.parseInt(idx)];
    }
    return void 0;
  }
  return void 0;
};
