import React from 'react';
import { useSearchIssues } from '../hooks/useSearchIssues';
import type { IssueState } from '@/shared/api/github-queries';

/**
 * Component to test the search issues functionality
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
      <div style={{ padding: '20px', backgroundColor: '#fee', borderRadius: '8px' }}>
        <h3>Error loading issues</h3>
        <p>{error.message}</p>
        <button onClick={refresh}>Try Again</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>GitHub Issues Explorer</h1>
      
      {/* Search Filters */}
      <div style={{ 
        display: 'flex', 
        gap: '10px', 
        marginBottom: '20px',
        padding: '15px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px'
      }}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search issues..."
          style={{
            flex: 1,
            padding: '8px 12px',
            fontSize: '14px',
            border: '1px solid #ddd',
            borderRadius: '4px'
          }}
        />
        
        <select
          value={state}
          onChange={handleStateChange}
          style={{
            padding: '8px 12px',
            fontSize: '14px',
            border: '1px solid #ddd',
            borderRadius: '4px'
          }}
        >
          <option value="ALL">All States</option>
          <option value="OPEN">Open</option>
          <option value="CLOSED">Closed</option>
        </select>
        
        <button
          onClick={resetFilters}
          style={{
            padding: '8px 16px',
            fontSize: '14px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Reset
        </button>
        
        <button
          onClick={refresh}
          disabled={isFetching}
          style={{
            padding: '8px 16px',
            fontSize: '14px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isFetching ? 'not-allowed' : 'pointer',
            opacity: isFetching ? 0.6 : 1
          }}
        >
          {isFetching ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {/* Results Count */}
      <div style={{ marginBottom: '15px', color: '#666' }}>
        <strong>Total Issues:</strong> {totalCount.toLocaleString()}
        {isFetching && ' (loading...)'}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p>Loading issues...</p>
        </div>
      )}

      {/* Issues List */}
      {!isLoading && issues.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {issues.map((issue) => (
            <div
              key={issue.id}
              style={{
                padding: '15px',
                backgroundColor: 'white',
                border: '1px solid #ddd',
                borderRadius: '8px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <span style={{
                  padding: '2px 8px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  backgroundColor: issue.state === 'OPEN' ? '#28a745' : '#6f42c1',
                  color: 'white',
                  borderRadius: '12px'
                }}>
                  {issue.state}
                </span>
                <strong style={{ fontSize: '16px' }}>
                  #{issue.number} - {issue.title}
                </strong>
              </div>
              
              {issue.body && (
                <p style={{ 
                  margin: '10px 0', 
                  color: '#666',
                  fontSize: '14px',
                  maxHeight: '60px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {issue.body.slice(0, 200)}...
                </p>
              )}
              
              <div style={{ display: 'flex', gap: '15px', fontSize: '12px', color: '#999' }}>
                <span>👤 {issue.author?.login || 'Unknown'}</span>
                <span>💬 {issue.comments.totalCount} comments</span>
                <span>🕒 {new Date(issue.createdAt).toLocaleDateString()}</span>
              </div>
              
              {issue.labels.nodes.length > 0 && (
                <div style={{ display: 'flex', gap: '5px', marginTop: '8px', flexWrap: 'wrap' }}>
                  {issue.labels.nodes.map((label) => (
                    <span
                      key={label.id}
                      style={{
                        padding: '2px 8px',
                        fontSize: '11px',
                        backgroundColor: `#${label.color}`,
                        color: 'white',
                        borderRadius: '3px'
                      }}
                    >
                      {label.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* No Results */}
      {!isLoading && issues.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
          <p>No issues found</p>
        </div>
      )}

      {/* Pagination */}
      {issues.length > 0 && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          marginTop: '20px',
          padding: '15px'
        }}>
          <button
            onClick={loadPreviousPage}
            disabled={!hasPreviousPage || isFetching}
            style={{
              padding: '8px 16px',
              fontSize: '14px',
              backgroundColor: hasPreviousPage ? '#007bff' : '#ccc',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: hasPreviousPage && !isFetching ? 'pointer' : 'not-allowed'
            }}
          >
            ← Previous
          </button>
          
          <button
            onClick={loadNextPage}
            disabled={!hasNextPage || isFetching}
            style={{
              padding: '8px 16px',
              fontSize: '14px',
              backgroundColor: hasNextPage ? '#007bff' : '#ccc',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: hasNextPage && !isFetching ? 'pointer' : 'not-allowed'
            }}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
};