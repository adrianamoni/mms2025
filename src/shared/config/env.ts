// Environment configuration with TypeScript typing
export const env = {
  // GitHub API Configuration
  GITHUB_TOKEN: import.meta.env.VITE_GITHUB_TOKEN as string,
  GITHUB_API_URL: import.meta.env.VITE_GITHUB_API_URL as string,
  
  // GitHub Repository Configuration
  GITHUB_REPO_OWNER: import.meta.env.VITE_GITHUB_REPO_OWNER as string,
  GITHUB_REPO_NAME: import.meta.env.VITE_GITHUB_REPO_NAME as string,
  
  // App Configuration
  APP_NAME: import.meta.env.VITE_APP_NAME as string,
  APP_VERSION: import.meta.env.VITE_APP_VERSION as string,
  
  // Pagination Configuration
  DEFAULT_PAGE_SIZE: Number(import.meta.env.VITE_DEFAULT_PAGE_SIZE) || 20,
  MAX_PAGE_SIZE: Number(import.meta.env.VITE_MAX_PAGE_SIZE) || 100,
} as const;

// Type definitions for environment variables
export type EnvConfig = typeof env;

// Validation function to ensure all required env vars are present
export const validateEnv = (): void => {
  const requiredVars = [
    'GITHUB_TOKEN',
    'GITHUB_API_URL',
    'GITHUB_REPO_OWNER', 
    'GITHUB_REPO_NAME'
  ] as const;
  
  const missing = requiredVars.filter(key => !env[key]);
  
  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}\n` +
      'Please check your .env file and ensure all variables are set.'
    );
  }
};