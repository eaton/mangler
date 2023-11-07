// Currently just a convenience wrapper around the HtmlToText library's core
// function. We may want to put some default configuration here, however:
// presets for processing certain kinds of HTML, for example.

export type { HtmlToTextOptions } from 'html-to-text';
export { htmlToText as toText } from 'html-to-text';
