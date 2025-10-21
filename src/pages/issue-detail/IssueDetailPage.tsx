import React from 'react';
import { useParams, Link } from 'react-router-dom';

/**
 * Issue Detail Page
 * Displays a single issue with its comments
 */
export const IssueDetailPage: React.FC = () => {
  const { issueNumber } = useParams<{ issueNumber: string }>();

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <Link 
        to="/"
        style={{
          display: 'inline-block',
          marginBottom: '20px',
          padding: '8px 16px',
          backgroundColor: '#007bff',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '4px'
        }}
      >
        ← Back to Issues
      </Link>

      <div style={{ 
        padding: '20px', 
        backgroundColor: '#f5f5f5', 
        borderRadius: '8px',
        textAlign: 'center'
      }}>
        <h1>Issue #{issueNumber}</h1>
        <p style={{ color: '#666', marginTop: '10px' }}>
          🚧 Issue detail view coming soon...
        </p>
        <p style={{ fontSize: '14px', color: '#999', marginTop: '20px' }}>
          This page will display the full issue details and comments
        </p>
      </div>
    </div>
  );
};