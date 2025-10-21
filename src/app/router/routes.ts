/**
 * Route paths as constants for type-safe navigation
 */
export const ROUTES = {
  HOME: '/',
  ISSUES: '/issues',
  ISSUE_DETAIL: (issueNumber: number | string) => `/issues/${issueNumber}`,
  NOT_FOUND: '/404',
} as const;