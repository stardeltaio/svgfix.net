import { describe, it, expect } from 'vitest';
import { optimizeSvg } from '../optimize';

describe('optimizeSvg', () => {
  it('should optimize SVG', async () => {
    const svg = '<svg viewBox="0 0 100 100">  <path d="M 10 10 L 90 90"/>  </svg>';
    const result = await optimizeSvg(svg);

    expect(result).toBeTruthy();
    expect(result.length).toBeLessThanOrEqual(svg.length);
  });

  it('should preserve viewBox', async () => {
    const svg = '<svg viewBox="0 0 100 100"><path d="M 10 10 L 90 90"/></svg>';
    const result = await optimizeSvg(svg);

    expect(result).toContain('viewBox');
  });

  it('should throw TypeError for non-string input', async () => {
    await expect(optimizeSvg(123 as any)).rejects.toThrow(TypeError);
  });

  it('should throw Error for invalid SVG', async () => {
    await expect(optimizeSvg('not valid svg')).rejects.toThrow();
  });
});
