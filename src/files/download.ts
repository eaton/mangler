import { Readable } from 'stream';
import { ReadableStream } from 'stream/web';
import { finished } from 'stream/promises';
import { Disk } from './disk.js';

/**
 * Download the contents of a URL to a local file.
 */
export async function download(url: string, file: string): Promise<void> {
  const resp = await fetch(url);
  if (resp.ok && resp.body) {
    Disk.file(file);
    const stream = Disk.createWriteStream(file, { autoClose: true });
    const body = resp.body as ReadableStream<any>;
    return finished(Readable.fromWeb(body).pipe(stream));
  } else {
    return Promise.reject(new Error(resp.statusText));
  }
}

/**
 * Requests a URL and returns a promise resolving to a Readable with
 * the contents of the response body.
 */
export async function downloadAsReadable(url: string): Promise<Readable> {
  const resp = await fetch(url);
  if (resp.ok && resp.body) {
    const body = resp.body as ReadableStream<any>;
    return Readable.fromWeb(body);
  } else {
    return Promise.reject(new Error(resp.statusText));
  }
}
