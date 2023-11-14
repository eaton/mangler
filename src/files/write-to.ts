import { isBuffer } from "@sindresorhus/is";
import { SimpleSerializer, findForFile } from "../serialize/index.js";
import { Disk } from "./disk.js";
import path from 'path';

export function writeTo(output: string, data: unknown, serializer?: SimpleSerializer) {
  const s = serializer ?? findForFile(path.parse(output).ext);
  if (s) {
    return Disk.write(output, s.stringify(data));
  } else if (isBuffer(data) || typeof data === 'string') {
    return Disk.write(output, data);
  } else {
    return Disk.write(output, JSON.stringify(data));
  }
}

export async function writeToAsync(output: string, data: unknown, serializer?: SimpleSerializer) {
  const s = serializer ?? findForFile(path.parse(output).ext);
  if (s) {
    return Disk.writeAsync(output, s.stringify(data));
  } else if (isBuffer(data) || typeof data === 'string') {
    return Disk.writeAsync(output, data);
  } else {
    return Disk.writeAsync(output, JSON.stringify(data));
  }
}