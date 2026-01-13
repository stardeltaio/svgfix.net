import { describe, it, expect } from 'vitest';
import { parseSvg, parseViewBox } from '../parse-svg';
import { readFileSync } from 'fs';
import { join } from 'path';

function loadFixture(name: string): string {
  return readFileSync(join(__dirname, 'fixtures', name), 'utf-8');
}

describe('parseSvg', () => {
  it('should parse a simple SVG with viewBox', () => {
    const svg = loadFixture('simple.svg');
    const result = parseSvg(svg);

    expect(result.viewBox).toEqual({
      minX: 0,
      minY: 0,
      width: 100,
      height: 100,
    });
    expect(result.paths).toHaveLength(1);
    expect(result.paths[0]).toBe('M 10 10 L 90 10 L 90 90 L 10 90 Z');
  });

  it('should parse SVG with offset viewBox', () => {
    const svg = loadFixture('offset.svg');
    const result = parseSvg(svg);

    expect(result.viewBox).toEqual({
      minX: 50,
      minY: 50,
      width: 100,
      height: 100,
    });
    expect(result.paths).toHaveLength(1);
  });

  it('should parse complex SVG with multiple paths', () => {
    const svg = loadFixture('complex.svg');
    const result = parseSvg(svg);

    expect(result.viewBox).toEqual({
      minX: 20,
      minY: 30,
      width: 200,
      height: 150,
    });
    expect(result.paths).toHaveLength(3);
  });

  it('should handle SVG without viewBox', () => {
    const svg = loadFixture('no-viewbox.svg');
    const result = parseSvg(svg);

    expect(result.viewBox).toBeNull();
    expect(result.width).toBe('100');
    expect(result.height).toBe('100');
    expect(result.paths).toHaveLength(1);
  });

  it('should throw error for non-string input', () => {
    expect(() => parseSvg(123 as any)).toThrow(TypeError);
    expect(() => parseSvg(null as any)).toThrow(TypeError);
    expect(() => parseSvg(undefined as any)).toThrow(TypeError);
  });

  it('should throw error for empty string', () => {
    expect(() => parseSvg('')).toThrow('svgString cannot be empty');
    expect(() => parseSvg('   ')).toThrow('svgString cannot be empty');
  });

  it('should throw error when no SVG element found', () => {
    expect(() => parseSvg('not an svg')).toThrow('No <svg> element found');
    expect(() => parseSvg('<div></div>')).toThrow('No <svg> element found');
  });

  it('should handle SVG with malformed viewBox', () => {
    const svg = '<svg viewBox="invalid"><path d="M 0 0"/></svg>';
    const result = parseSvg(svg);

    expect(result.viewBox).toBeNull();
  });

  it('should handle SVG with no paths', () => {
    const svg = '<svg viewBox="0 0 100 100"><rect x="10" y="10" width="80" height="80"/></svg>';
    const result = parseSvg(svg);

    expect(result.paths).toHaveLength(0);
  });
});

describe('parseViewBox', () => {
  it('should parse valid viewBox string', () => {
    const result = parseViewBox('0 0 100 100');
    expect(result).toEqual({ minX: 0, minY: 0, width: 100, height: 100 });
  });

  it('should parse viewBox with negative values', () => {
    const result = parseViewBox('-50 -50 200 200');
    expect(result).toEqual({ minX: -50, minY: -50, width: 200, height: 200 });
  });

  it('should parse viewBox with comma separators', () => {
    const result = parseViewBox('10,20,300,400');
    expect(result).toEqual({ minX: 10, minY: 20, width: 300, height: 400 });
  });

  it('should parse viewBox with mixed separators', () => {
    const result = parseViewBox('10, 20 300, 400');
    expect(result).toEqual({ minX: 10, minY: 20, width: 300, height: 400 });
  });

  it('should throw error for invalid input', () => {
    expect(() => parseViewBox('invalid')).toThrow('Invalid viewBox format');
    expect(() => parseViewBox('1 2 3')).toThrow('Invalid viewBox format');
    expect(() => parseViewBox('1 2 3 4 5')).toThrow('Invalid viewBox format');
  });

  it('should throw TypeError for non-string input', () => {
    expect(() => parseViewBox(123 as any)).toThrow(TypeError);
  });
});
