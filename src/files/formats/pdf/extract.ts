import {PDFExtract, PDFExtractOptions} from 'pdf.js-extract';

export async function extract(file: string, options: PDFExtractOptions = {}) {
  const pdfExtract = new PDFExtract();
  return pdfExtract.extract(file, options)
}