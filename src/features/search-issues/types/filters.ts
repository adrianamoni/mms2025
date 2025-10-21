import type { IssueState } from '@/shared/api/github-queries';

/**
 * Search filters for GitHub issues
 */
export type IssueSearchFilters = {
  // Search term for title/body
  searchTerm: string;
  
  // Issue state (OPEN or CLOSED)
  state: IssueState | 'ALL';
  
  // Number of results per page
  pageSize: number;
  
  // Cursor for pagination
  cursor?: string;
};

/**
 * Initial/default search filters
 */
export const DEFAULT_SEARCH_FILTERS: IssueSearchFilters = {
  searchTerm: '',
  state: 'OPEN',
  pageSize: 20,
  cursor: undefined,
};