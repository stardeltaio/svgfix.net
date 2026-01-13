/**
 * Format SVG output
 *
 * Pretty-prints or minifies SVG string based on options.
 *
 * @param svgString - The SVG string to format
 * @param minify - Whether to minify (remove whitespace) or pretty-print
 * @returns Formatted SVG string
 *
 * @throws {TypeError} When svgString is not a string
 *
 * @example
 * ```typescript
 * // Pretty-print
 * const svg = '<svg><path d="M 0 0"/></svg>';
 * const pretty = formatSvg(svg, false);
 * // Multi-line with indentation
 * ```
 *
 * @example
 * ```typescript
 * // Minify
 * const svg = '<svg>\n  <path d="M 0 0"/>\n</svg>';
 * const minified = formatSvg(svg, true);
 * // Single line, no extra whitespace
 * ```
 *
 * @lastModified 2026-01-13
 */
export function formatSvg(svgString: string, minify: boolean = false): string {
  if (typeof svgString !== 'string') {
    throw new TypeError('svgString must be a string');
  }

  if (minify) {
    // Minify: remove unnecessary whitespace
    return svgString
      .replace(/>\s+</g, '><') // Remove whitespace between tags
      .replace(/\s{2,}/g, ' ') // Collapse multiple spaces
      .trim();
  } else {
    // Pretty-print: add indentation
    let formatted = '';
    let indent = 0;
    const lines = svgString.split(/>\s*</);

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i].trim();

      // Add back the brackets
      if (i > 0) line = '<' + line;
      if (i < lines.length - 1) line = line + '>';

      // Adjust indent
      if (line.match(/<\//) && !line.match(/<[^/]/)) {
        indent--;
      }

      // Add formatted line
      formatted += '  '.repeat(Math.max(0, indent)) + line + '\n';

      // Increase indent for opening tags (not self-closing or closed)
      if (line.match(/<[^/!?]/) && !line.match(/\/>/) && !line.match(/<\/./)) {
        indent++;
      }
    }

    return formatted.trim();
  }
}
