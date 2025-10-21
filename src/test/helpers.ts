import { vi } from 'vitest';

/**
 * Test helpers and utilities
 */

/**
 * Wait for a specific amount of time
 * Useful for testing debounce or async behavior
 */
export function waitFor(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Flush all pending promises
 */
export async function flushPromises(): Promise<void> {
  return new Promise(resolve => setImmediate(resolve));
}

/**
 * Mock window.scrollTo for testing
 */
export function mockScrollTo() {
  const scrollToMock = vi.fn();
  window.scrollTo = scrollToMock;
  return scrollToMock;
}
