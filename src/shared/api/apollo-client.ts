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
    Repository: {
      fields: {
        issues: {
          keyArgs: ['states', 'filterBy'],
          merge(existing, incoming, { args }) {
            if (!existing || !args || args.after === undefined) {
              return incoming;
            }
            
            return {
              ...incoming,
              edges: [...(existing.edges || []), ...(incoming.edges || [])],
            };
          },
        },
      },
    },
    Issue: {
      fields: {
        comments: {
          keyArgs: [],
          merge(existing, incoming, { args }) {
            if (!existing || !args || args.after === undefined) {
              return incoming;
            }
            
            return {
              ...incoming,
              edges: [...(existing.edges || []), ...(incoming.edges || [])],
            };
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