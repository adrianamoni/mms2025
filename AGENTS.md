# AGENTS.md - Development Guidelines

## 🎯 Project Architecture Rules

This document contains the essential guidelines and patterns that must be followed throughout the development of this project.

## 📦 Import Conventions

### Absolute Imports with @ Alias
- **ALWAYS** use absolute imports with the `@` alias
- **NEVER** use relative imports with `../`

```typescript
// ✅ Good
import { Button } from '@/features/ui/components/Button'
import { useIssues } from '@/features/issues/hooks/useIssues'
import { IssueType } from '@/shared/types'

// ❌ Bad
import { Button } from '../../../components/Button'
import { useIssues } from '../../hooks/useIssues'
```

### Import Order
1. External libraries (React, Apollo, etc.)
2. Shared/common imports
3. Feature-specific imports
4. Local components/hooks
5. Types/interfaces
6. Styles

## 🏗️ Architecture Pattern: Feature-Sliced Design

Following the **Feature-Sliced Design** and **Bulletproof React** patterns, organize code by features with clear separation of concerns:

### Folder Structure

```
src/
├── app/                    # App-wide setup and providers
│   ├── providers/         # App providers (Apollo, Router, etc.)
│   ├── router/           # Routes configuration
│   └── App.tsx
├── features/              # Feature-based modules
│   ├── issues/
│   │   ├── api/          # GraphQL queries/mutations
│   │   ├── hooks/        # Feature-specific hooks
│   │   ├── components/   # UI components
│   │   ├── types/        # TypeScript types
│   │   └── utils/        # Helper functions
│   └── comments/
│       ├── api/
│       ├── hooks/
│       ├── components/
│       └── types/
├── shared/                # Shared resources
│   ├── ui/               # Design system components
│   ├── hooks/            # Shared hooks
│   ├── types/            # Shared types
│   ├── utils/            # Shared utilities
│   └── constants/        # App constants
└── pages/                # Route pages

```

## 🔧 Development Patterns

### 1. Separation of Concerns

**ALWAYS** separate business logic from UI components:

```typescript
// ✅ Good - Logic in custom hook
// features/issues/hooks/useIssueSearch.ts
export const useIssueSearch = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [status, setStatus] = useState<'OPEN' | 'CLOSED'>('OPEN')
  
  const { data, loading, error } = useQuery(SEARCH_ISSUES, {
    variables: { searchTerm, status }
  })
  
  return {
    issues: data?.repository?.issues,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    status,
    setStatus
  }
}

// features/issues/components/IssueSearch.tsx
export const IssueSearch: FC = () => {
  const { issues, loading, searchTerm, setSearchTerm } = useIssueSearch()
  
  // Pure UI component
  return (
    <div>
      <SearchInput value={searchTerm} onChange={setSearchTerm} />
      {/* ... */}
    </div>
  )
}
```

### 2. No Barrel Files Pattern

**NEVER** use barrel files (index.ts) for exports. Import directly from the file where the component/hook/type is defined:

```typescript
// ✅ Good - Direct imports
import { IssueList } from '@/features/issues/components/IssueList/IssueList'
import { IssueDetail } from '@/features/issues/components/IssueDetail/IssueDetail'
import { useIssues } from '@/features/issues/hooks/useIssues'
import type { Issue, IssueStatus } from '@/features/issues/types/issue.types'

// ❌ Bad - Using barrel files
// features/issues/index.ts
export { IssueList } from './components/IssueList'
export { IssueDetail } from './components/IssueDetail'
```

This approach:
- Makes dependencies explicit and traceable
- Improves tree-shaking
- Avoids circular dependency issues
- Makes refactoring easier

### 3. Custom Hooks Pattern

- Extract complex logic into custom hooks
- Prefix with `use`
- Return objects for multiple values
- Keep hooks focused on a single responsibility

```typescript
// ✅ Good
const useIssueFilters = () => {
  const [filters, setFilters] = useState<IssueFilters>(defaultFilters)
  
  const updateFilter = useCallback((key: keyof IssueFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }, [])
  
  return { filters, updateFilter }
}
```

### 4. Component Structure

```typescript
// features/issues/components/IssueCard/IssueCard.tsx
interface IssueCardProps {
  issue: Issue
  onSelect?: (issue: Issue) => void
}

export const IssueCard: FC<IssueCardProps> = ({ issue, onSelect }) => {
  // Hooks first
  const { formatDate } = useFormatters()
  
  // Event handlers
  const handleClick = useCallback(() => {
    onSelect?.(issue)
  }, [issue, onSelect])
  
  // Render
  return (
    <Card onClick={handleClick}>
      {/* ... */}
    </Card>
  )
}
```

## 📐 TypeScript Guidelines

### Type Consistency
- **ALWAYS** use `type` instead of `interface` for consistency
- **NEVER** mix interfaces and types in the codebase

```typescript
// ✅ Good - Using type
type IssueCardProps = {
  issue: Issue
  onSelect?: (issue: Issue) => void
}

// ❌ Bad - Using interface
interface IssueCardProps {
  issue: Issue
  onSelect?: (issue: Issue) => void
}
```

### Strong Typing
- Define types for all props
- Use type inference where possible
- Avoid `any` - use `unknown` if needed
- Export shared types from feature's types folder

### GraphQL Types
- Generate types from GraphQL schema
- Use generated types in queries and components

## 🎨 Styling with Styled-Components

```typescript
// features/issues/components/IssueCard/IssueCard.styles.ts
import styled from 'styled-components'

export const Card = styled.article`
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  
  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`
```

## ✅ Testing Strategy

- Unit tests for hooks and utilities
- Integration tests for features
- Component tests with React Testing Library
- E2E tests for critical user flows

```typescript
// features/issues/hooks/__tests__/useIssueSearch.test.ts
describe('useIssueSearch', () => {
  it('should filter issues by search term', () => {
    // Test implementation
  })
})
```

## 🚨 Error Handling

- Use error boundaries for component errors
- Handle GraphQL errors in hooks
- Provide user-friendly error messages
- Log errors appropriately

```typescript
// features/issues/hooks/useIssues.ts
const { data, loading, error } = useQuery(GET_ISSUES)

if (error) {
  console.error('Failed to fetch issues:', error)
  return {
    error: 'Unable to load issues. Please try again later.',
    // ... other returns
  }
}
```

## 📝 Commit Conventions

### Conventional Commits

**ALWAYS** use conventional commits format for consistent and meaningful commit history:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Commit Types

| Type | Description | Example |
|------|-------------|---------|
| **feat** | New feature | `feat(issues): add search functionality` |
| **fix** | Bug fix | `fix(api): handle GraphQL error responses` |
| **docs** | Documentation changes | `docs: update README with setup instructions` |
| **style** | Code style changes (formatting, etc.) | `style(components): format issue card component` |
| **refactor** | Code refactoring | `refactor(hooks): extract common logic to useApi` |
| **test** | Adding or updating tests | `test(issues): add unit tests for search hook` |
| **chore** | Maintenance tasks | `chore: update dependencies to latest versions` |
| **ci** | CI/CD changes | `ci: add GitHub Actions workflow` |
| **perf** | Performance improvements | `perf(search): optimize issue filtering algorithm` |
| **build** | Build system changes | `build: configure bundle analyzer` |

### Examples

```bash
# ✅ Good commits
feat(search): implement real-time issue search
fix(router): resolve navigation issue on refresh
docs(api): add GraphQL query documentation
refactor(components): extract reusable Button component
test(features): add integration tests for issue list
chore(deps): update @apollo/client to v4.0.7

# ❌ Bad commits
added search
fix bug
update files
changes
wip
```

### Scope Guidelines

Use scopes to indicate the area of change:
- `issues` - Issue-related features
- `comments` - Comment functionality  
- `search` - Search functionality
- `ui` - UI components
- `api` - API related changes
- `router` - Routing changes
- `auth` - Authentication
- `config` - Configuration changes

### Breaking Changes

For breaking changes, add `!` after the type/scope:

```bash
feat(api)!: change GraphQL query structure
```

### Commit Body and Footer

Include additional context when needed:

```bash
feat(issues): add pagination support

- Implement cursor-based pagination
- Add loading states for page transitions
- Update issue list component to handle pages

Closes: #123
Co-authored-by: Developer Name <email@example.com>
```

## 📋 Code Review Checklist

Before submitting code, ensure:

- [ ] All imports use `@` alias
- [ ] Logic is extracted into custom hooks
- [ ] Components follow feature-based structure
- [ ] TypeScript types are properly defined
- [ ] Error states are handled
- [ ] Code is tested
- [ ] No console.logs in production code
- [ ] Components are pure and focused
- [ ] **Commits follow conventional commit format**
- [ ] **Commit messages are clear and descriptive**
- [ ] **Breaking changes are properly marked**

## 🔗 References

- [Feature-Sliced Design](https://feature-sliced.design/)
- [Bulletproof React](https://github.com/alan2207/bulletproof-react)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)

---

**Remember:** A well-structured codebase is a maintainable codebase. Follow these patterns consistently!