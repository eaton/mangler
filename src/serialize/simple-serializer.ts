export interface SimpleSerializer<T = unknown> {
  extensions: string[];
  parse(data: string, ...args: unknown[]): T;
  stringify(data: unknown, ...args: unknown[]): string;
}
