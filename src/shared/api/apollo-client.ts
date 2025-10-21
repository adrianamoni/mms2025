import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { SetContextLink } from '@apollo/client/link/context';
import { env, validateEnv } from '@/shared/config/env';

// Validate environment variables on startup
validateEnv();

// HTTP Link for GraphQL endpoint
const httpLink = createHttpLink({
  uri: env.GITHUB_API_URL,
});

// Authentication link to add the GitHub token to headers
// Using the new SetContextLink API with flipped arguments (prevContext first)
const authLink = new SetContextLink((prevContext) => {
  return {
    headers: {
      ...prevContext.headers,
      authorization: env.GITHUB_TOKEN ? `Bearer ${env.GITHUB_TOKEN}` : '',
      'Content-Type': 'application/json',
    },
  };
});

// Cache configuration
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        search: {
          // Include 'after' cursor in key to cache each page separately
          keyArgs: ['query', 'type', 'first', 'after'],
          // Replace data (don't merge) since each page is independent
          merge(_existing, incoming) {
            return incoming;
          },
        },
        repository: {
          // Custom merge function for repository field
          merge(_existing, incoming) {
            return incoming;
          },
        },
      },
    },
    Repository: {
      // Disable normalization for Repository to avoid keyFields errors
      keyFields: false,
      fields: {
        issues: {
          // Include 'after' cursor in key to cache each page separately
          keyArgs: ['states', 'filterBy', 'first', 'after'],
          // Replace data (don't merge) since each page is independent
          merge(_existing, incoming) {
            return incoming;
          },
        },
      },
    },
    Issue: {
      fields: {
        comments: {
          keyArgs: ['first', 'after'],
          // Replace data (don't merge)
          merge(_existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

// Create Apollo Client instance
export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
      notifyOnNetworkStatusChange: true,
    },
    query: {
      errorPolicy: 'all',
    },
  },
});

// Type-safe client export
export type ApolloClientType = typeof apolloClient;