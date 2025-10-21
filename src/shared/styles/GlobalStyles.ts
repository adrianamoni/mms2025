import { createGlobalStyle } from 'styled-components';

/**
 * Global Styles
 * Applies base styles and resets to the application
 */
export const GlobalStyles = createGlobalStyle`
  /* CSS Reset and Base Styles */
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }

  body {
    font-family: ${({ theme }) => theme.typography.fontFamily.base};
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    line-height: ${({ theme }) => theme.typography.lineHeight.normal};
    color: ${({ theme }) => theme.colors.text.primary};
    background-color: ${({ theme }) => theme.colors.background.default};
    min-height: 100vh;
  }

  /* Headings */
  h1, h2, h3, h4, h5, h6 {
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    line-height: ${({ theme }) => theme.typography.lineHeight.tight};
    color: ${({ theme }) => theme.colors.text.primary};
  }

  h1 {
    font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
  }

  h2 {
    font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  }

  h3 {
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
  }

  h4 {
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
  }

  h5, h6 {
    font-size: ${({ theme }) => theme.typography.fontSize.base};
  }

  /* Links */
  a {
    color: ${({ theme }) => theme.colors.text.link};
    text-decoration: none;
    transition: color ${({ theme }) => theme.transitions.duration.fast} ${({ theme }) => theme.transitions.easing.ease};

    &:hover {
      color: ${({ theme }) => theme.colors.text.linkHover};
      text-decoration: underline;
    }

    &:focus-visible {
      outline: 2px solid ${({ theme }) => theme.colors.primary.main};
      outline-offset: 2px;
      border-radius: ${({ theme }) => theme.borderRadius.sm};
    }
  }

  /* Buttons */
  button {
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    cursor: pointer;
    border: none;
    background: none;

    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }

    &:focus-visible {
      outline: 2px solid ${({ theme }) => theme.colors.primary.main};
      outline-offset: 2px;
    }
  }

  /* Form elements */
  input, textarea, select {
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    color: inherit;

    &:focus {
      outline: 2px solid ${({ theme }) => theme.colors.primary.main};
      outline-offset: 0;
    }

    &::placeholder {
      color: ${({ theme }) => theme.colors.text.tertiary};
    }
  }

  /* Code */
  code, pre {
    font-family: ${({ theme }) => theme.typography.fontFamily.mono};
    font-size: 0.875em;
  }

  code {
    padding: 0.125rem 0.25rem;
    background-color: ${({ theme }) => theme.colors.background.subtle};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
  }

  pre {
    padding: ${({ theme }) => theme.spacing.md};
    background-color: ${({ theme }) => theme.colors.background.subtle};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    overflow-x: auto;

    code {
      padding: 0;
      background: none;
    }
  }

  /* Lists */
  ul, ol {
    padding-left: ${({ theme }) => theme.spacing.lg};
  }

  /* Images */
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  /* Selection */
  ::selection {
    background-color: ${({ theme }) => theme.colors.primary.light};
    color: ${({ theme }) => theme.colors.primary.contrast};
  }

  /* Scrollbar (Webkit browsers) */
  ::-webkit-scrollbar {
    width: 12px;
    height: 12px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.background.paper};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.neutral.gray[300]};
    border-radius: ${({ theme }) => theme.borderRadius.full};
    border: 2px solid ${({ theme }) => theme.colors.background.paper};

    &:hover {
      background: ${({ theme }) => theme.colors.neutral.gray[400]};
    }
  }

  /* Focus visible polyfill */
  .js-focus-visible :focus:not(.focus-visible) {
    outline: none;
  }
`;
