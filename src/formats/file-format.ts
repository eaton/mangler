export interface FileFormat {
  extensions: string[];
  parse(data: string): unknown;
  stringify(data: unknown): string;
}
