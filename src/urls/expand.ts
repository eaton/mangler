import Unshort from "url-unshort";

export async function expand(url: string | string[]): Promise<Record<string, string>> {
  const urls = Array.isArray(url) ? url : [url];
  const output: Record<string, string> = {};
  const uu = Unshort();

  for (const u of urls) {
    output[u] = await uu.expand(u);
  }

  return Promise.resolve(output);
}