export interface SimpleSerializer<Input = unknown, Output = unknown> {
  extensions: string[];
  validate(data: Input): boolean;
  parse(data: string, ...args: unknown[]): Output;
  stringify(data: Input, ...args: unknown[]): string;
}
