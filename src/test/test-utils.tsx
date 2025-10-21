/* eslint-disable react-refresh/only-export-components */
import type { ReactElement } from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { theme } from '@/shared/styles/theme';

/**
 * Create a new QueryClient for each test to avoid cache pollution
 */
export function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
      mutations: {
        retry: false,
      },
    },
  });
}

type AllTheProvidersProps = {
  children: React.ReactNode;
  queryClient?: QueryClient;
};

/**
 * Wrapper component with all providers needed for testing
 */
export function AllTheProviders({ children, queryClient }: AllTheProvidersProps) {
  const client = queryClient || createTestQueryClient();

  return (
    <QueryClientProvider client={client}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

type CustomRenderOptions = Omit<RenderOptions, 'wrapper'> & {
  queryClient?: QueryClient;
  route?: string;
};

/**
 * Custom render function that includes all necessary providers
 * 
 * @example
 * ```tsx
 * const { getByText } = renderWithProviders(<MyComponent />);
 * ```
 */
export function renderWithProviders(
  ui: ReactElement,
  { queryClient, route = '/', ...options }: CustomRenderOptions = {}
) {
  if (route !== '/') {
    window.history.pushState({}, 'Test page', route);
  }

  return render(ui, {
    wrapper: ({ children }) => (
      <AllTheProviders queryClient={queryClient}>
        {children}
      </AllTheProviders>
    ),
    ...options,
  });
}

// Re-export everything from testing-library
export * from '@testing-library/react';
export { renderWithProviders as render };
