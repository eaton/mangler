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