import { useMemo } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useGraphQLQuery } from '@/shared/hooks/useGraphQL';
import { GET_ISSUE_DETAIL } from '@/shared/api/github-queries';
import { env } from '@/shared/config/env';
import type { IssueDetail, Issue } from '@/shared/api/github-queries';

/**
 * Response type from the GET_ISSUE_DETAIL query
 */
type IssueDetailResponse = {
  repository: {
    issue: IssueDetail;
  };
};

/**
 * Variables for the issue detail query
 */
type IssueDetailVariables = {
  owner: string;
  name: string;
  number: number;
  commentsFirst: number;
  commentsAfter?: string;
};

/**
 * Custom hook to fetch issue detail with comments
 * Leverages React Query cache to show cached issue data immediately
 * while loading full details and comments
 */
export function useIssueDetail(issueNumber: number) {
  const queryClient = useQueryClient();

  // Try to get initial data from cache (from the issues list)
  const cachedIssue = useMemo(() => {
    // Search through all cached queries to find this issue
    const queryCache = queryClient.getQueryCache();
    const queries = queryCache.getAll();

    for (const query of queries) {
      const data = query.state.data;
      
      // Check if this is a repository issues query
      if (data && typeof data === 'object' && 'repository' in data) {
        const repoData = data as { repository?: { issues?: { edges?: Array<{ node: Issue }> } } };
        const issue = repoData.repository?.issues?.edges?.find(
          (edge) => edge.node.number === issueNumber
        );
        if (issue) {
          return issue.node;
        }
      }
      
      // Check if this is a search query
      if (data && typeof data === 'object' && 'search' in data) {
        const searchData = data as { search?: { edges?: Array<{ node: Issue }> } };
        const issue = searchData.search?.edges?.find(
          (edge) => edge.node.number === issueNumber
        );
        if (issue) {
          return issue.node;
        }
      }
    }
    
    return null;
  }, [queryClient, issueNumber]);

  // Prepare variables for the detail query
  const variables = useMemo<IssueDetailVariables>(() => ({
    owner: env.GITHUB_REPO_OWNER,
    name: env.GITHUB_REPO_NAME,
    number: issueNumber,
    commentsFirst: 100, // Fetch more comments for frontend pagination
  }), [issueNumber]);

  // Query key for caching
  const queryKey = useMemo(() => [
    'github',
    'issue',
    env.GITHUB_REPO_OWNER,
    env.GITHUB_REPO_NAME,
    issueNumber,
    'detail',
  ], [issueNumber]);

  // Fetch full issue details with comments
  const { data, isLoading, error, refetch, isFetching } = useGraphQLQuery<
    IssueDetailResponse,
    IssueDetailVariables
  >(
    queryKey,
    GET_ISSUE_DETAIL,
    variables,
    {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
      // Use cached issue data as placeholder while loading full details
      placeholderData: cachedIssue ? {
        repository: {
          issue: {
            ...cachedIssue,
            bodyHTML: cachedIssue.body || '',
            closedAt: null,
            assignees: { nodes: [] },
            labels: {
              nodes: cachedIssue.labels.nodes.map(label => ({
                ...label,
                description: null,
              })),
            },
            comments: {
              totalCount: cachedIssue.comments?.totalCount || 0,
              pageInfo: {
                hasNextPage: false,
                hasPreviousPage: false,
                startCursor: null,
                endCursor: null,
              },
              edges: [],
            },
            reactions: { totalCount: 0 },
          } as IssueDetail,
        },
      } : undefined,
    }
  );

  const issue = data?.repository?.issue;
  const comments = issue?.comments?.edges?.map(edge => edge.node) || [];
  const commentsPageInfo = issue?.comments?.pageInfo;
  const commentsTotal = issue?.comments?.totalCount || 0;

  return {
    issue,
    comments,
    commentsPageInfo,
    commentsTotal,
    isLoading,
    isFetching,
    error,
    refetch,
    // Flag to indicate if we're showing cached data
    isShowingCachedData: !isLoading && !!cachedIssue && !issue,
  };
}
