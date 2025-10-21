import React from 'react';
import { Link } from 'react-router-dom';

/**
 * 404 Not Found Page
 */
export const NotFoundPage: React.FC = () => {
  return (
    <div style={{ 
      padding: '60px 20px', 
      maxWidth: '600px', 
      margin: '0 auto',
      textAlign: 'center'
    }}>
      <div style={{
        fontSize: '120px',
        fontWeight: 'bold',
        color: '#ddd',
        marginBottom: '20px'
      }}>
        404
      </div>
      
      <h1 style={{ marginBottom: '10px' }}>Page Not Found</h1>
      
      <p style={{ 
        color: '#666', 
        marginBottom: '30px',
        fontSize: '16px'
      }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      
      <Link 
        to="/"
        style={{
          display: 'inline-block',
          padding: '12px 24px',
          backgroundColor: '#007bff',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '8px',
          fontWeight: 'bold',
          transition: 'background-color 0.2s'
        }}
      >
        Go to Home
      </Link>
    </div>
  );
};