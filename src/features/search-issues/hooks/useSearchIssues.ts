import { useState, useCallback, useMemo } from 'react';
import { useGraphQLQuery } from '@/shared/hooks/useGraphQL';
import { SEARCH_ISSUES, SEARCH_ISSUES_BY_TEXT } from '@/shared/api/github-queries';
import { env } from '@/shared/config/env';
import type { IssueSearchFilters } from '../types/filters';
import { DEFAULT_SEARCH_FILTERS } from '../types/filters';
import type { IssuesConnection, IssueState } from '@/shared/api/github-queries';

/**
 * Response type from the GitHub GraphQL API (repository.issues)
 */
type SearchIssuesResponse = {
  repository: {
    issues: IssuesConnection;
  };
};

/**
 * Response type from GitHub Search API
 */
type SearchIssuesByTextResponse = {
  search: {
    issueCount: number;
    pageInfo: {
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor: string | null;
      endCursor: string | null;
    };
    edges: Array<{
      node: {
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
        repository: {
          name: string;
          owner: {
            login: string;
          };
        };
      };
    }>;
  };
};

/**
 * Variables for the search issues query (no text search)
 */
type SearchIssuesVariables = {
  owner: string;
  name: string;
  first: number;
  after?: string;
  states?: IssueState[];
};

/**
 * Variables for search by text query
 */
type SearchByTextVariables = {
  query: string;
  first: number;
  after?: string;
  type: 'ISSUE';
};

/**
 * Custom hook for searching GitHub issues
 * Combines search functionality with filtering and pagination
 */
export function useSearchIssues() {
  // Local state for filters
  const [filters, setFilters] = useState<IssueSearchFilters>(DEFAULT_SEARCH_FILTERS);
  
  // History of cursors for backward navigation
  const [cursorHistory, setCursorHistory] = useState<(string | undefined)[]>([undefined]);

  // Determine if we need to use text search
  const hasSearchTerm = filters.searchTerm.trim().length > 0;

  // Prepare variables for repository issues query (no text search)
  const repoVariables = useMemo<SearchIssuesVariables>(() => {
    const vars: SearchIssuesVariables = {
      owner: env.GITHUB_REPO_OWNER,
      name: env.GITHUB_REPO_NAME,
      first: filters.pageSize,
    };

    if (filters.cursor) {
      vars.after = filters.cursor;
    }

    if (filters.state !== 'ALL') {
      vars.states = [filters.state];
    }

    return vars;
  }, [filters]);

  // Prepare variables for text search query
  const searchVariables = useMemo<SearchByTextVariables>(() => {
    // Build GitHub search query string
    let searchQuery = `repo:${env.GITHUB_REPO_OWNER}/${env.GITHUB_REPO_NAME} is:issue ${filters.searchTerm.trim()}`;
    
    if (filters.state !== 'ALL') {
      searchQuery += ` is:${filters.state.toLowerCase()}`;
    }

    return {
      query: searchQuery,
      first: filters.pageSize,
      after: filters.cursor,
      type: 'ISSUE',
    };
  }, [filters]);

  // Create a unique query key that changes when cursor changes
  const queryKey = useMemo(() => {
    return [
      'github',
      'repository',
      env.GITHUB_REPO_OWNER,
      env.GITHUB_REPO_NAME,
      'issues',
      filters.state,
      filters.searchTerm,
      filters.cursor || 'initial', // Ensure cursor is part of the key
      filters.pageSize,
    ];
  }, [filters.state, filters.searchTerm, filters.cursor, filters.pageSize]);

  // Use the appropriate query based on whether there's a search term
  const { data, isLoading, error, refetch, isFetching } = useGraphQLQuery(
    queryKey,
    hasSearchTerm ? SEARCH_ISSUES_BY_TEXT : SEARCH_ISSUES,
    hasSearchTerm ? searchVariables : repoVariables,
    {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes - use cache for better performance
    }
  );

  // Extract issues and pagination info based on query type
  const issues = hasSearchTerm
    ? (data as SearchIssuesByTextResponse)?.search?.edges?.map(edge => edge.node) || []
    : (data as SearchIssuesResponse)?.repository?.issues?.edges?.map(edge => edge.node) || [];
  
  const pageInfo = hasSearchTerm
    ? (data as SearchIssuesByTextResponse)?.search?.pageInfo
    : (data as SearchIssuesResponse)?.repository?.issues?.pageInfo;
  
  const totalCount = hasSearchTerm
    ? (data as SearchIssuesByTextResponse)?.search?.issueCount || 0
    : (data as SearchIssuesResponse)?.repository?.issues?.totalCount || 0;

  // Update search term
  const setSearchTerm = useCallback((searchTerm: string) => {
    // Reset cursor history when search changes
    setCursorHistory([undefined]);
    setFilters(prev => ({
      ...prev,
      searchTerm,
      cursor: undefined, // Reset cursor when search term changes
    }));
  }, []);

  // Update issue state filter
  const setState = useCallback((state: IssueState | 'ALL') => {
    // Reset cursor history when filter changes
    setCursorHistory([undefined]);
    setFilters(prev => ({
      ...prev,
      state,
      cursor: undefined, // Reset cursor when filter changes
    }));
  }, []);

  // Load next page
  const loadNextPage = useCallback(() => {
    if (pageInfo?.hasNextPage && pageInfo.endCursor) {
      // Add current cursor to history before moving forward
      setCursorHistory(prev => [...prev, pageInfo.endCursor!]);
      
      setFilters(prev => ({
        ...prev,
        cursor: pageInfo.endCursor!,
      }));
    }
  }, [pageInfo]);

  // Load previous page
  const loadPreviousPage = useCallback(() => {
    if (cursorHistory.length > 1) {
      // Remove the last cursor from history
      const newHistory = [...cursorHistory];
      newHistory.pop(); // Remove current page cursor
      const previousCursor = newHistory[newHistory.length - 1];
      
      setCursorHistory(newHistory);
      setFilters(prev => ({
        ...prev,
        cursor: previousCursor,
      }));
    }
  }, [cursorHistory]);

  // Reset all filters
  const resetFilters = useCallback(() => {
    setCursorHistory([undefined]);
    setFilters(DEFAULT_SEARCH_FILTERS);
  }, []);

  // Manual refetch
  const refresh = useCallback(() => {
    refetch();
  }, [refetch]);

  return {
    // Data
    issues,
    totalCount,
    
    // Filters
    filters,
    searchTerm: filters.searchTerm,
    state: filters.state,
    
    // Pagination
    pageInfo,
    hasNextPage: pageInfo?.hasNextPage || false,
    hasPreviousPage: cursorHistory.length > 1, // Based on history, not GraphQL pageInfo
    
    // Loading states
    isLoading,
    isFetching,
    error,
    
    // Actions
    setSearchTerm,
    setState,
    loadNextPage,
    loadPreviousPage,
    resetFilters,
    refresh,
  };
}