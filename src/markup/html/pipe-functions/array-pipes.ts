import { CheerioPipeFunction } from "./index.js";
import is from "@sindresorhus/is";

export const shift: CheerioPipeFunction = ({ value }) => (Array.isArray(value) ? value.shift() : void 0);

export const pop: CheerioPipeFunction = ({ value }) => (Array.isArray(value) ? value.pop() : void 0);

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
}

export const index: CheerioPipeFunction = ({ value, args }) => {
  if (Array.isArray(value)) {
    const [idx] = args ?? [];
    if (is.numericString(idx)) {
      return value[Number.parseInt(idx)];
    }
    return void 0;
  }
  return void 0;
}