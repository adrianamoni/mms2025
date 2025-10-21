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
  ) {
    repository(owner: $owner, name: $name) {
      issues(
        first: $first
        after: $after
        states: $states
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

// GraphQL query to get issue detail with comments
export const GET_ISSUE_DETAIL = gql`
  query GetIssueDetail(
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
        closedAt
        author {
          login
          avatarUrl
          url
        }
        labels(first: 20) {
          nodes {
            id
            name
            color
            description
          }
        }
        assignees(first: 10) {
          nodes {
            login
            avatarUrl
            url
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
                url
              }
            }
          }
        }
        reactions {
          totalCount
        }
      }
    }
  }
`;

// GraphQL query to search issues by text using GitHub Search API
export const SEARCH_ISSUES_BY_TEXT = gql`
  query SearchIssuesByText(
    $query: String!
    $first: Int!
    $after: String
    $type: SearchType!
  ) {
    search(
      query: $query
      type: $type
      first: $first
      after: $after
    ) {
      issueCount
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          ... on Issue {
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
            repository {
              name
              owner {
                login
              }
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
    url?: string;
  } | null;
};

export type IssueDetail = {
  id: string;
  number: number;
  title: string;
  body: string;
  bodyHTML: string;
  state: IssueState;
  createdAt: string;
  updatedAt: string;
  closedAt: string | null;
  author: {
    login: string;
    avatarUrl: string;
    url?: string;
  } | null;
  labels: {
    nodes: Array<{
      id: string;
      name: string;
      color: string;
      description: string | null;
    }>;
  };
  assignees: {
    nodes: Array<{
      login: string;
      avatarUrl: string;
      url?: string;
    }>;
  };
  comments: CommentsConnection;
  reactions: {
    totalCount: number;
  };
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