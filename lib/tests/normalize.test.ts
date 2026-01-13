import { describe, it, expect } from 'vitest';
import { normalizeViewBox } from '../normalize';

describe('normalizeViewBox', () => {
  it('should set viewBox to 0 0 width height', () => {
    const svg = '<svg viewBox="50 50 100 100"><path d="M 10 10 L 90 90"/></svg>';
    const result = normalizeViewBox(svg, 100, 100);

    expect(result).toContain('viewBox="0 0 100 100"');
  });

  it('should add viewBox if not present', () => {
    const svg = '<svg width="100" height="100"><path d="M 10 10 L 90 90"/></svg>';
    const result = normalizeViewBox(svg, 100, 100);

    expect(result).toContain('viewBox="0 0 100 100"');
  });

  it('should throw TypeError for invalid inputs', () => {
    expect(() => normalizeViewBox(123 as any, 100, 100)).toThrow(TypeError);
    expect(() => normalizeViewBox('<svg/>', 'invalid' as any, 100)).toThrow(TypeError);
  });

  it('should throw Error for invalid dimensions', () => {
    expect(() => normalizeViewBox('<svg/>', 0, 100)).toThrow('width and height must be positive');
    expect(() => normalizeViewBox('<svg/>', 100, -10)).toThrow('width and height must be positive');
  });
});
