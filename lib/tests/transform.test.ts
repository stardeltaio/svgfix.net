import { describe, it, expect } from 'vitest';
import { transformPathsToOrigin } from '../transform';

describe('transformPathsToOrigin', () => {
  it('should translate paths by negative viewBox offset', () => {
    const svg = '<svg viewBox="50 50 100 100"><path d="M 60 60 L 140 140"/></svg>';
    const viewBox = { minX: 50, minY: 50, width: 100, height: 100 };
    const result = transformPathsToOrigin(svg, viewBox);

    // Path should be translated by -50, -50
    expect(result).toContain('M10 10');
    expect(result).toContain('L90 90');
  });

  it('should not transform if viewBox is already at origin', () => {
    const svg = '<svg viewBox="0 0 100 100"><path d="M 10 10 L 90 90"/></svg>';
    const viewBox = { minX: 0, minY: 0, width: 100, height: 100 };
    const result = transformPathsToOrigin(svg, viewBox);

    expect(result).toBe(svg);
  });

  it('should handle negative viewBox offsets', () => {
    const svg = '<svg viewBox="-50 -50 100 100"><path d="M -40 -40 L 40 40"/></svg>';
    const viewBox = { minX: -50, minY: -50, width: 100, height: 100 };
    const result = transformPathsToOrigin(svg, viewBox);

    // Translate by +50, +50
    expect(result).toMatch(/M\s*10\s+10/);
  });

  it('should throw TypeError for invalid inputs', () => {
    expect(() => transformPathsToOrigin(123 as any, {} as any)).toThrow(TypeError);
    expect(() => transformPathsToOrigin('<svg/>', null as any)).toThrow(TypeError);
  });
});
