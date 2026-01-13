import { describe, it, expect } from 'vitest';
import { processSvg } from '../process';
import { readFileSync } from 'fs';
import { join } from 'path';

function loadFixture(name: string): string {
  return readFileSync(join(__dirname, 'fixtures', name), 'utf-8');
}

describe('processSvg', () => {
  it('should process simple SVG with default options', async () => {
    const svg = loadFixture('simple.svg');
    const result = await processSvg(svg);

    expect(result.success).toBe(true);
    expect(result.errors).toHaveLength(0);
    expect(result.svg).toContain('viewBox="0 0');
    expect(result.stats.viewBoxAfter.minX).toBe(0);
    expect(result.stats.viewBoxAfter.minY).toBe(0);
  });

  it('should transform offset SVG to origin', async () => {
    const svg = loadFixture('offset.svg');
    const result = await processSvg(svg);

    expect(result.success).toBe(true);
    expect(result.stats.viewBoxBefore?.minX).toBe(50);
    expect(result.stats.viewBoxAfter.minX).toBe(0);
    expect(result.stats.viewBoxAfter.minY).toBe(0);
  });

  it('should process complex SVG with multiple paths', async () => {
    const svg = loadFixture('complex.svg');
    const result = await processSvg(svg);

    expect(result.success).toBe(true);
    expect(result.svg).toContain('viewBox="0 0');
  });

  it('should handle SVG without viewBox', async () => {
    const svg = loadFixture('no-viewbox.svg');
    const result = await processSvg(svg);

    expect(result.success).toBe(true);
    expect(result.stats.viewBoxBefore).toBeNull();
    expect(result.stats.viewBoxAfter.minX).toBe(0);
  });

  it('should respect partial options', async () => {
    const svg = loadFixture('simple.svg');
    const result = await processSvg(svg, {
      cropWhitespace: true,
      transformToOrigin: false,
      normalizeViewBox: false,
      optimize: false,
      minify: false,
    });

    expect(result.success).toBe(true);
  });

  it('should handle SVG with no paths gracefully', async () => {
    const svg = '<svg viewBox="0 0 100 100"><rect x="10" y="10" width="80" height="80"/></svg>';
    const result = await processSvg(svg);

    expect(result.success).toBe(true);
    expect(result.warnings).toContain('No paths found in SVG - nothing to process');
  });

  it('should return errors for invalid SVG', async () => {
    const svg = 'not an svg';
    const result = await processSvg(svg);

    expect(result.success).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
  });

  it('should minify when option is enabled', async () => {
    const svg = loadFixture('simple.svg');
    const result = await processSvg(svg, { minify: true });

    expect(result.success).toBe(true);
    expect(result.svg).not.toContain('\n  '); // No indentation
  });

  it('should report size reduction in stats', async () => {
    const svg = loadFixture('simple.svg');
    const result = await processSvg(svg, { optimize: true, minify: true });

    expect(result.success).toBe(true);
    expect(result.stats.processedSize).toBeLessThanOrEqual(result.stats.originalSize);
  });
});
