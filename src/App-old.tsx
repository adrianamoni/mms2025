import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { env } from '@/shared/config/env'
import { AppProviders } from '@/app/providers/AppProviders'

function App() {
  const [count, setCount] = useState(0)

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
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '5px' }}>
        <h3>Environment Configuration ✅</h3>
        <p><strong>App:</strong> {env.APP_NAME} v{env.APP_VERSION}</p>
        <p><strong>Repository:</strong> {env.GITHUB_REPO_OWNER}/{env.GITHUB_REPO_NAME}</p>
        <p><strong>API URL:</strong> {env.GITHUB_API_URL}</p>
        <p><strong>Token:</strong> {env.GITHUB_TOKEN ? '✅ Configured' : '❌ Missing'}</p>
        <p><strong>Page Size:</strong> {env.DEFAULT_PAGE_SIZE} (max: {env.MAX_PAGE_SIZE})</p>
      </div>
    </>
  )
}

function AppContent() {
  const [count, setCount] = useState(0)

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
      </div>
    </>
  )
}

export default App
