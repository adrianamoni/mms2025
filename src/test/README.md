# Testing Setup

This directory contains the testing infrastructure for the application.

## 📁 Structure

```
src/test/
├── setup.ts              # Global test setup and configuration
├── setup.test.ts         # Smoke test to verify setup
├── test-utils.tsx        # Custom render with providers
├── helpers.ts            # Test utility functions
└── mocks/
    └── factories.ts      # Mock data factories
```

## 🚀 Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test

# Run tests with UI
pnpm test:ui

# Run tests with coverage
pnpm test:coverage
```

## 🧪 Writing Tests

### Basic Component Test

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@/test/test-utils';
import { MyComponent } from './MyComponent';

describe('MyComponent', () => {
  it('should render correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

### Hook Test

```tsx
import { describe, it, expect } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useMyHook } from './useMyHook';

describe('useMyHook', () => {
  it('should return expected value', () => {
    const { result } = renderHook(() => useMyHook());
    expect(result.current).toBeDefined();
  });
});
```

### Using Mock Factories

```tsx
import { createMockIssue, createMockIssues } from '@/test/mocks/factories';

const mockIssue = createMockIssue({
  title: 'Custom Title',
  state: 'CLOSED',
});

const mockIssues = createMockIssues(5); // Creates 5 mock issues
```

### Custom Render with Providers

The `render` function from `test-utils.tsx` automatically wraps components with:
- ThemeProvider
- QueryClientProvider
- BrowserRouter

```tsx
import { render } from '@/test/test-utils';

// All providers are automatically included
render(<MyComponent />);
```

## 🎯 Test Coverage

Run `pnpm test:coverage` to generate coverage reports.

Coverage reports will be available in:
- Console output
- `coverage/index.html` (open in browser for detailed view)

## 📝 Best Practices

1. **Arrange-Act-Assert**: Structure tests clearly
2. **Test behavior, not implementation**: Focus on user interactions
3. **Use semantic queries**: Prefer `getByRole`, `getByLabelText` over `getByTestId`
4. **Mock external dependencies**: Use factories for consistent test data
5. **Keep tests isolated**: Each test should be independent

## 🔧 Configuration

- **vitest.config.ts**: Main test configuration
- **setup.ts**: Global test setup, mocks for browser APIs
- **test-utils.tsx**: Custom render with all providers
