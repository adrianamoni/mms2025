import React from 'react';
import { ApolloProvider } from '@apollo/client/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from 'styled-components';
import { apolloClient } from '@/shared/api/apollo-client';
import { queryClient } from '@/shared/api/query-client';
import { theme } from '@/shared/styles/theme';
import { GlobalStyles } from '@/shared/styles/GlobalStyles';

type AppProvidersProps = {
  children: React.ReactNode;
};

/**
 * Root providers for the application
 * Combines Apollo Client, TanStack Query, and Styled Components providers
 */
export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ApolloProvider client={apolloClient}>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          {children}
          {/* React Query Devtools - only in development */}
          {import.meta.env.DEV && (
            <ReactQueryDevtools initialIsOpen={false} />
          )}
        </ThemeProvider>
      </ApolloProvider>
    </QueryClientProvider>
  );
};