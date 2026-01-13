import { describe, it, expect } from 'vitest';
import { formatSvg } from '../format';

describe('formatSvg', () => {
  it('should minify SVG when minify is true', () => {
    const svg = '<svg>\n  <path d="M 0 0"/>\n</svg>';
    const result = formatSvg(svg, true);

    expect(result).not.toContain('\n');
    expect(result).toBe('<svg><path d="M 0 0"/></svg>');
  });

  it('should pretty-print SVG when minify is false', () => {
    const svg = '<svg><path d="M 0 0"/></svg>';
    const result = formatSvg(svg, false);

    expect(result).toContain('\n');
  });

  it('should handle already minified SVG', () => {
    const svg = '<svg><path d="M 0 0"/></svg>';
    const result = formatSvg(svg, true);

    expect(result).toBe(svg);
  });

  it('should throw TypeError for non-string input', () => {
    expect(() => formatSvg(123 as any)).toThrow(TypeError);
  });
});
