import { describe, it, expect } from 'vitest';

describe('Test Setup', () => {
  it('should run a basic test', () => {
    expect(true).toBe(true);
  });

  it('should have vitest globals available', () => {
    expect(describe).toBeDefined();
    expect(it).toBeDefined();
    expect(expect).toBeDefined();
  });
});
