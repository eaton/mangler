export interface FileFormat {
  extensions: string[];
  parse(data: string, ...args: unknown[]): unknown;
  stringify(data: unknown, ...args: unknown[]): string;
}
