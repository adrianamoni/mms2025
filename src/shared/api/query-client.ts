import { QueryClient } from '@tanstack/react-query';

// TanStack Query configuration
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Stale time - how long until data is considered stale
      staleTime: 5 * 60 * 1000, // 5 minutes
      
      // Cache time - how long data stays in cache after becoming unused
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      
      // Retry configuration
      retry: (failureCount, error: Error) => {
        // Don't retry on GraphQL errors or authentication errors
        if (error.message.includes('401') || error.message.includes('403')) {
          return false;
        }
        // Retry up to 3 times for other errors
        return failureCount < 3;
      },
      
      // Retry delay with exponential backoff
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      
      // Refetch on window focus (useful for real-time data)
      refetchOnWindowFocus: false,
      
      // Refetch on reconnect
      refetchOnReconnect: true,
    },
    mutations: {
      // Retry mutations once on failure
      retry: 1,
      retryDelay: 1000,
    },
  },
});

// Query keys factory for consistent query key management
export const queryKeys = {
  // GitHub repository queries
  github: {
    root: ['github'] as const,
    repository: (owner: string, name: string) => 
      [...queryKeys.github.root, 'repository', owner, name] as const,
    issues: (owner: string, name: string, filters?: Record<string, unknown>) =>
      [...queryKeys.github.repository(owner, name), 'issues', filters] as const,
    issue: (owner: string, name: string, number: number) =>
      [...queryKeys.github.repository(owner, name), 'issue', number] as const,
    comments: (owner: string, name: string, issueNumber: number, cursor?: string) =>
      [...queryKeys.github.issue(owner, name, issueNumber), 'comments', cursor] as const,
  },
} as const;

// Helper function to invalidate GitHub queries
export const invalidateGitHubQueries = () => {
  queryClient.invalidateQueries({ queryKey: queryKeys.github.root });
};

// Helper function to prefetch repository data
export const prefetchRepository = (owner: string, name: string) => {
  return queryClient.prefetchQuery({
    queryKey: queryKeys.github.repository(owner, name),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};