import React from 'react';
import { useSearchIssues } from '../hooks/useSearchIssues';
import type { IssueState } from '@/shared/api/github-queries';
import { Button } from '@/shared/ui/Button/Button';
import { Badge } from '@/shared/ui/Badge/Badge';
import { IssueCardSkeleton } from './IssueCardSkeleton/IssueCardSkeleton';
import { getContrastColor, formatDate } from '@/shared/utils/styling';
import * as S from './IssueSearchDemo.styles';

/**
 * Issues Search and List Component
 * Displays a searchable/filterable list of GitHub issues with pagination
 */
export const IssueSearchDemo: React.FC = () => {
  const {
    issues,
    totalCount,
    searchTerm,
    state,
    isLoading,
    isFetching,
    error,
    hasNextPage,
    hasPreviousPage,
    setSearchTerm,
    setState,
    loadNextPage,
    loadPreviousPage,
    resetFilters,
    refresh,
  } = useSearchIssues();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setState(e.target.value as IssueState | 'ALL');
  };

  if (error) {
    return (
      <S.Container>
        <S.ErrorContainer>
          <h3>Error loading issues</h3>
          <p>{error.message}</p>
          <Button onClick={refresh} variant="danger">
            Try Again
          </Button>
        </S.ErrorContainer>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.Title>GitHub Issues Explorer</S.Title>
      
      {/* Search Filters */}
      <S.FiltersContainer>
        <S.SearchInput
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search issues..."
        />
        
        <S.Select value={state} onChange={handleStateChange}>
          <option value="ALL">All States</option>
          <option value="OPEN">Open</option>
          <option value="CLOSED">Closed</option>
        </S.Select>
        
        <Button onClick={resetFilters} variant="secondary">
          Reset
        </Button>
        
        <Button onClick={refresh} disabled={isFetching} variant="primary">
          {isFetching ? 'Refreshing...' : 'Refresh'}
        </Button>
      </S.FiltersContainer>

      {/* Results Count */}
      <S.ResultsCount>
        <strong>Total Issues:</strong> {totalCount.toLocaleString()}
        {isFetching && ' (loading...)'}
      </S.ResultsCount>

      {/* Loading State - Show skeleton cards */}
      {isLoading && (
        <S.IssuesList>
          {Array.from({ length: 8 }).map((_, index) => (
            <IssueCardSkeleton key={index} />
          ))}
        </S.IssuesList>
      )}

      {/* Issues List */}
      {!isLoading && issues.length > 0 && (
        <S.IssuesList>
          {issues.map((issue) => (
            <S.IssueCardContainer key={issue.id}>
              <S.IssueHeader>
                <Badge variant={issue.state === 'OPEN' ? 'open' : 'closed'} size="sm">
                  {issue.state}
                </Badge>
                <S.IssueNumber>#{issue.number}</S.IssueNumber>
              </S.IssueHeader>
              
              <S.IssueTitle>{issue.title}</S.IssueTitle>
              
              {issue.body && (
                <S.IssueBody>
                  {issue.body}
                </S.IssueBody>
              )}
              
              <S.IssueMetadata>
                <S.MetadataItem>
                  <span>👤</span>
                  <span>{issue.author?.login || 'Unknown'}</span>
                </S.MetadataItem>
                <S.MetadataItem>
                  <span>💬</span>
                  <span>{issue.comments.totalCount} comments</span>
                </S.MetadataItem>
                <S.MetadataItem>
                  <span>🕒</span>
                  <span>{formatDate(issue.createdAt)}</span>
                </S.MetadataItem>
              </S.IssueMetadata>
              
              {issue.labels.nodes.length > 0 && (
                <S.LabelsContainer>
                  {issue.labels.nodes.map((label) => (
                    <Badge
                      key={label.id}
                      size="sm"
                      style={{ 
                        backgroundColor: `#${label.color}`,
                        color: getContrastColor(label.color)
                      }}
                    >
                      {label.name}
                    </Badge>
                  ))}
                </S.LabelsContainer>
              )}
            </S.IssueCardContainer>
          ))}
        </S.IssuesList>
      )}

      {/* No Results */}
      {!isLoading && issues.length === 0 && (
        <S.NoResults>
          <p>No issues found</p>
        </S.NoResults>
      )}

      {/* Pagination */}
      {issues.length > 0 && (
        <S.PaginationContainer>
          <Button
            onClick={loadPreviousPage}
            disabled={!hasPreviousPage || isFetching}
            variant="outline"
          >
            ← Previous
          </Button>
          
          <Button
            onClick={loadNextPage}
            disabled={!hasNextPage || isFetching}
            variant="primary"
          >
            Next →
          </Button>
        </S.PaginationContainer>
      )}
    </S.Container>
  );
};