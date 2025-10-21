import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { env } from '@/shared/config/env'
import { AppProviders } from '@/app/providers/AppProviders'
import { IssueSearchDemo } from '@/features/search-issues/components/IssueSearchDemo'

function App() {
  return (
    <AppProviders>
      <AppContent />
    </AppProviders>
  );
}

function AppContent() {
  const [showDemo, setShowDemo] = useState(false);
  const [count, setCount] = useState(0)

  // If demo is active, show the Issue Search Demo
  if (showDemo) {
    return (
      <div>
        <button 
          onClick={() => setShowDemo(false)}
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            zIndex: 1000
          }}
        >
          ← Back to Config
        </button>
        <IssueSearchDemo />
      </div>
    );
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>GitHub Issues Explorer</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Apollo Client + TanStack Query configured successfully! 🚀
      </p>
      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '5px' }}>
        <h3>Configuration Status ✅</h3>
        <p><strong>App:</strong> {env.APP_NAME} v{env.APP_VERSION}</p>
        <p><strong>Repository:</strong> {env.GITHUB_REPO_OWNER}/{env.GITHUB_REPO_NAME}</p>
        <p><strong>API URL:</strong> {env.GITHUB_API_URL}</p>
        <p><strong>Token:</strong> {env.GITHUB_TOKEN ? '✅ Configured' : '❌ Missing'}</p>
        <p><strong>Page Size:</strong> {env.DEFAULT_PAGE_SIZE} (max: {env.MAX_PAGE_SIZE})</p>
        <div style={{ marginTop: '10px', padding: '8px', backgroundColor: '#e8f5e8', borderRadius: '4px' }}>
          <strong>✅ Apollo Client:</strong> Configured with GitHub GraphQL API<br/>
          <strong>✅ TanStack Query:</strong> Advanced caching and state management<br/>
          <strong>✅ Environment:</strong> Variables loaded and validated
        </div>
        <button 
          onClick={() => setShowDemo(true)}
          style={{
            marginTop: '20px',
            padding: '12px 24px',
            fontSize: '16px',
            fontWeight: 'bold',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }}
        >
          🚀 Try Issue Search Demo
        </button>
      </div>
    </>
  )
}

export default App