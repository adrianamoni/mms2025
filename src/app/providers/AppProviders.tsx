import React from 'react';
import { ApolloProvider } from '@apollo/client/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { apolloClient } from '@/shared/api/apollo-client';
import { queryClient } from '@/shared/api/query-client';

type AppProvidersProps = {
  children: React.ReactNode;
};

/**
 * Root providers for the application
 * Combines Apollo Client and TanStack Query providers
 */
export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ApolloProvider client={apolloClient}>
        {children}
        {/* React Query Devtools - only in development */}
        {import.meta.env.DEV && (
          <ReactQueryDevtools initialIsOpen={false} />
        )}
      </ApolloProvider>
    </QueryClientProvider>
  );
};