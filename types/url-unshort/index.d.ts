export = Unshort;
declare function Unshort(options: UnshortOptions = {}): Unshort.url_unshort;

declare namespace Unshort {

  export class url_unshort {
    add(domain: string | string[], options?: AddDomainOptions): void;
    expand(url: string): Promise<string>;
    remove(domain: string | string[] | undefined): void;
    request(url: string, options: Record<string, unknown>): Promise<string>;
  }
  
  export interface UnshortOptions {
    nesting?: number;
    cache?: UnshortCache;
    request?: Record<string, unknown>
  }

  export interface AddDomainOptions {
    aliases?: string[];
    match?: string | RegExp;
    validate?: Function;
    fetch?: Function;
    link_selector?: string;
  }

  export interface UnshortCache {
    get: (key: string) => Promise<string>;
    set: (key: string, value: string) => Promise<void>;
  }
}
