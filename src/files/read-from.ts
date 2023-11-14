import { isString } from "@sindresorhus/is";
import { SimpleSerializer, findForFile } from "../serialize/index.js";
import { Disk } from "./disk.js";
import path from 'path';

export function readFrom(file: string, serializer?: SimpleSerializer) {
  const s = serializer ?? findForFile(path.parse(file).ext);
  if (s) {
    return s.parse(Disk.read(file) as string);
  } else {
    return Disk.read(file);
  }
}

export async function readFromAsync(file: string, serializer?: SimpleSerializer) {
  const s = serializer ?? findForFile(path.parse(file).ext);
  if (s) {
    return Disk.readAsync(file).then(d => isString(d) ? s.parse(d) : d)
  } else {
    return Disk.readAsync(file);
  }
}