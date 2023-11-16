export interface SimpleSerializer<Input = unknown, Output = unknown> {
  extensions: string[];
  parse(data: string, ...args: unknown[]): Output;
  stringify(data: Input, ...args: unknown[]): string;
}
