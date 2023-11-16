import { isString } from "@sindresorhus/is";
import { Serializer } from "fs-jetpack/types";

export const Base64: Serializer<string, string> = {
  validate: (data: unknown) => isString(data),
  parse: (input: string) => Buffer.from(input, 'base64').toString('utf8'),
  stringify: (input: string) => Buffer.from(input, 'utf-8').toString('base64')
};
