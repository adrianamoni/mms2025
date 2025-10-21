/// <reference types="vite/client" />

interface ImportMetaEnv {
  // GitHub API Configuration
  readonly VITE_GITHUB_TOKEN: string
  readonly VITE_GITHUB_API_URL: string
  
  // GitHub Repository Configuration  
  readonly VITE_GITHUB_REPO_OWNER: string
  readonly VITE_GITHUB_REPO_NAME: string
  
  // App Configuration
  readonly VITE_APP_NAME: string
  readonly VITE_APP_VERSION: string
  
  // Pagination Configuration
  readonly VITE_DEFAULT_PAGE_SIZE: string
  readonly VITE_MAX_PAGE_SIZE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}