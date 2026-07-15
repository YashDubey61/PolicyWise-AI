// PDF text extraction utility using pdf-parse
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { PDFParse } = require('pdf-parse');

export interface ParsedPDF {
  text: string;
  numPages: number;
  info: Record<string, unknown>;
}

/**
 * Extract text from a PDF buffer.
 * Returns the full text content and metadata.
 */
export async function extractTextFromPDF(buffer: Buffer): Promise<ParsedPDF> {
  const p = new PDFParse(new Uint8Array(buffer));
  const data = await p.getText();
  const info = await p.getInfo().catch(() => ({}));

  return {
    text: data.text || '',
    numPages: data.total || 0,
    info: info || {},
  };
}

/**
 * Truncate extracted text to fit within model context window.
 * GPT-4o supports ~128K tokens; we limit to ~100K chars to be safe.
 */
export function truncatePdfText(text: string, maxChars: number = 100000): string {
  if (text.length <= maxChars) return text;
  return text.slice(0, maxChars) + '\n\n[Document truncated due to length...]';
}
