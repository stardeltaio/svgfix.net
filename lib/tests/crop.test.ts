import { describe, it, expect } from 'vitest';
import { cropToContent } from '../crop';

describe('cropToContent', () => {
  it('should update viewBox to match bounds', () => {
    const svg = '<svg viewBox="0 0 200 200"><path d="M 50 50 L 150 150"/></svg>';
    const bounds = { x: 50, y: 50, x2: 150, y2: 150, width: 100, height: 100 };
    const result = cropToContent(svg, bounds);

    expect(result).toContain('viewBox="50 50 100 100"');
  });

  it('should add viewBox if not present', () => {
    const svg = '<svg width="200" height="200"><path d="M 50 50 L 150 150"/></svg>';
    const bounds = { x: 50, y: 50, x2: 150, y2: 150, width: 100, height: 100 };
    const result = cropToContent(svg, bounds);

    expect(result).toContain('viewBox="50 50 100 100"');
  });

  it('should handle negative coordinates', () => {
    const svg = '<svg viewBox="-100 -100 200 200"><path d="M -50 -50 L 50 50"/></svg>';
    const bounds = { x: -50, y: -50, x2: 50, y2: 50, width: 100, height: 100 };
    const result = cropToContent(svg, bounds);

    expect(result).toContain('viewBox="-50 -50 100 100"');
  });

  it('should throw TypeError for invalid inputs', () => {
    expect(() => cropToContent(123 as any, {} as any)).toThrow(TypeError);
    expect(() => cropToContent('<svg/>', null as any)).toThrow(TypeError);
  });
});
