import type { Issue, IssueComment, IssueDetail } from '@/shared/api/github-queries';

type IssueLabel = {
  id: string;
  name: string;
  color: string;
};

type IssueDetailLabel = IssueLabel & {
  description: string | null;
};

/**
 * Factory function to create a mock Label
 */
export function createMockLabel(overrides?: Partial<IssueLabel>): IssueLabel {
  return {
    id: 'label-1',
    name: 'bug',
    color: 'd73a4a',
    ...overrides,
  };
}

/**
 * Factory function to create a mock Label for IssueDetail
 */
export function createMockDetailLabel(overrides?: Partial<IssueDetailLabel>): IssueDetailLabel {
  return {
    id: 'label-1',
    name: 'bug',
    color: 'd73a4a',
    description: 'Something isn\'t working',
    ...overrides,
  };
}

/**
 * Factory function to create a mock Issue
 */
export function createMockIssue(overrides?: Partial<Issue>): Issue {
  return {
    id: 'issue-1',
    number: 1,
    title: 'Test Issue',
    body: 'This is a test issue body',
    state: 'OPEN',
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-02T00:00:00Z',
    author: {
      login: 'testuser',
      avatarUrl: 'https://avatars.githubusercontent.com/u/1?v=4',
    },
    labels: {
      nodes: [createMockLabel()],
    },
    comments: {
      totalCount: 0,
    },
    ...overrides,
  };
}

/**
 * Factory function to create a mock IssueComment
 */
export function createMockComment(overrides?: Partial<IssueComment>): IssueComment {
  return {
    id: 'comment-1',
    body: 'This is a test comment',
    bodyHTML: '<p>This is a test comment</p>',
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z',
    author: {
      login: 'commenter',
      avatarUrl: 'https://avatars.githubusercontent.com/u/2?v=4',
    },
    ...overrides,
  };
}

/**
 * Factory function to create a mock IssueDetail
 */
export function createMockIssueDetail(overrides?: Partial<IssueDetail>): IssueDetail {
  return {
    id: 'issue-1',
    number: 1,
    title: 'Test Issue Detail',
    body: 'This is a test issue body',
    bodyHTML: '<p>This is a test issue body</p>',
    state: 'OPEN',
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-02T00:00:00Z',
    closedAt: null,
    author: {
      login: 'testuser',
      avatarUrl: 'https://avatars.githubusercontent.com/u/1?v=4',
    },
    labels: {
      nodes: [createMockDetailLabel()],
    },
    assignees: {
      nodes: [],
    },
    comments: {
      totalCount: 0,
      pageInfo: {
        hasNextPage: false,
        hasPreviousPage: false,
        startCursor: null,
        endCursor: null,
      },
      edges: [],
    },
    reactions: {
      totalCount: 0,
    },
    ...overrides,
  };
}

/**
 * Create an array of mock issues
 */
export function createMockIssues(count: number): Issue[] {
  return Array.from({ length: count }, (_, index) =>
    createMockIssue({
      id: `issue-${index + 1}`,
      number: index + 1,
      title: `Test Issue ${index + 1}`,
      body: `Body for test issue ${index + 1}`,
    })
  );
}

/**
 * Create an array of mock comments
 */
export function createMockComments(count: number): IssueComment[] {
  return Array.from({ length: count }, (_, index) =>
    createMockComment({
      id: `comment-${index + 1}`,
      body: `Test comment ${index + 1}`,
      bodyHTML: `<p>Test comment ${index + 1}</p>`,
      author: {
        login: `user${index + 1}`,
        avatarUrl: `https://avatars.githubusercontent.com/u/${index + 1}?v=4`,
      },
    })
  );
}
