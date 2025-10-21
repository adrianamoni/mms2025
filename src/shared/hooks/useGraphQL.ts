import { useQuery, useMutation } from '@tanstack/react-query';
import type { UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import type { DocumentNode } from 'graphql';
import { apolloClient } from '@/shared/api/apollo-client';

// Helper type for GraphQL variables
type Variables = Record<string, unknown> | undefined;

/**
 * Custom hook that combines Apollo Client with TanStack Query for GraphQL queries
 * This gives us the benefits of both libraries:
 * - Apollo: GraphQL-specific features, caching, optimistic updates
 * - TanStack Query: Advanced caching strategies, background updates, retry logic
 */
export function useGraphQLQuery<TData = unknown, TVariables = Variables>(
  queryKey: readonly unknown[],
  query: DocumentNode,
  variables?: TVariables,
  options?: Omit<UseQueryOptions<TData, Error, TData, readonly unknown[]>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: [...queryKey, variables],
    queryFn: async (): Promise<TData> => {
      const result = await apolloClient.query({
        query,
        variables: variables as Record<string, unknown>,
        errorPolicy: 'all',
        fetchPolicy: 'cache-first', // Use cache when available
      });

      if (result.error) {
        throw result.error;
      }

      if (!result.data) {
        throw new Error('No data returned from GraphQL query');
      }

      return result.data as TData;
    },
    ...options,
  });
}

/**
 * Custom hook for GraphQL mutations with TanStack Query
 */
export function useGraphQLMutation<TData = unknown, TVariables = Variables>(
  mutation: DocumentNode,
  options?: UseMutationOptions<TData, Error, TVariables>
) {
  return useMutation({
    mutationFn: async (variables: TVariables): Promise<TData> => {
      try {
        const result = await apolloClient.mutate({
          mutation,
          variables: variables as Record<string, unknown>,
          errorPolicy: 'none', // Let Apollo handle errors directly
        });

        if (!result.data) {
          throw new Error('No data returned from GraphQL mutation');
        }

        return result.data as TData;
      } catch (error) {
        // Re-throw Apollo Client errors
        throw error instanceof Error ? error : new Error('Unknown error occurred');
      }
    },
    ...options,
  });
}