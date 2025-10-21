import { gql } from '@apollo/client';

// GraphQL query to get repository information
export const GET_REPOSITORY_INFO = gql`
  query GetRepositoryInfo($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      id
      name
      description
      stargazerCount
      forkCount
      issues(first: 1, states: [OPEN, CLOSED]) {
        totalCount
      }
      url
      createdAt
      updatedAt
    }
  }
`;

// GraphQL query to search issues
export const SEARCH_ISSUES = gql`
  query SearchIssues(
    $owner: String!
    $name: String!
    $first: Int!
    $after: String
    $states: [IssueState!]
    $query: String
  ) {
    repository(owner: $owner, name: $name) {
      issues(
        first: $first
        after: $after
        states: $states
        filterBy: { query: $query }
        orderBy: { field: UPDATED_AT, direction: DESC }
      ) {
        totalCount
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        edges {
          node {
            id
            number
            title
            body
            state
            createdAt
            updatedAt
            author {
              login
              avatarUrl
            }
            labels(first: 10) {
              nodes {
                id
                name
                color
              }
            }
            comments {
              totalCount
            }
          }
        }
      }
    }
  }
`;

// GraphQL query to get issue details with comments
export const GET_ISSUE_DETAILS = gql`
  query GetIssueDetails(
    $owner: String!
    $name: String!
    $number: Int!
    $commentsFirst: Int!
    $commentsAfter: String
  ) {
    repository(owner: $owner, name: $name) {
      issue(number: $number) {
        id
        number
        title
        body
        bodyHTML
        state
        createdAt
        updatedAt
        author {
          login
          avatarUrl
        }
        labels(first: 10) {
          nodes {
            id
            name
            color
          }
        }
        comments(first: $commentsFirst, after: $commentsAfter) {
          totalCount
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
          edges {
            node {
              id
              body
              bodyHTML
              createdAt
              updatedAt
              author {
                login
                avatarUrl
              }
            }
          }
        }
      }
    }
  }
`;

// Types for the GraphQL responses
export type Repository = {
  id: string;
  name: string;
  description: string | null;
  stargazerCount: number;
  forkCount: number;
  issues: {
    totalCount: number;
  };
  url: string;
  createdAt: string;
  updatedAt: string;
};

export type IssueState = 'OPEN' | 'CLOSED';

export type Issue = {
  id: string;
  number: number;
  title: string;
  body: string;
  state: IssueState;
  createdAt: string;
  updatedAt: string;
  author: {
    login: string;
    avatarUrl: string;
  } | null;
  labels: {
    nodes: Array<{
      id: string;
      name: string;
      color: string;
    }>;
  };
  comments: {
    totalCount: number;
  };
};

export type IssueComment = {
  id: string;
  body: string;
  bodyHTML: string;
  createdAt: string;
  updatedAt: string;
  author: {
    login: string;
    avatarUrl: string;
  } | null;
};

export type PageInfo = {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string | null;
  endCursor: string | null;
};

export type IssuesConnection = {
  totalCount: number;
  pageInfo: PageInfo;
  edges: Array<{
    node: Issue;
  }>;
};

export type CommentsConnection = {
  totalCount: number;
  pageInfo: PageInfo;
  edges: Array<{
    node: IssueComment;
  }>;
};