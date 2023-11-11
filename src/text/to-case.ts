import { KeyOf } from "@salesforce/ts-types";
import * as cases from "text-case";

const caseList = {
  camel: cases.camelCase, // `camelCase`
  pascal: cases.pascalCase, // `PascalCase`
  capital: cases.capitalCase, // `Capital Case`
  header: cases.headerCase, // `Header-Case`
  title: cases.titleCase, // `Title Case`
  path: cases.pathCase, // `path/case`
  snake: cases.snakeCase, // `snake_case`
  param: cases.paramCase, // `param-case`
  dot: cases.dotCase, // `dot.case`
  no: cases.noCase, // `no case`
  constant: cases.constantCase, // `CONSTANT_CASE`
  lower: cases.lowerCase, // `lower case`
  upper: cases.upperCase, // `UPPER CASE`
  first: cases.upperCaseFirst, // `Upper case first`
  swap: cases.swapCase, // `sWaP cAsE` -> `SwAp CaSe`
  sentence: cases.sentenceCase,
  same: (input: string) => input,
};

type caseType = KeyOf<typeof caseList>;
export function toCase(input: string, target: caseType = 'same') {
  return caseList[target](input);
}