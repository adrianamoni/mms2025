import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IssueSearchDemo } from '../IssueSearchDemo';
import { render } from '@/test/test-utils';
import { createMockIssue, createMockIssues } from '@/test/mocks/factories';
import * as useSearchIssuesModule from '../../hooks/useSearchIssues';

// Mock the useSearchIssues hook
vi.mock('../../hooks/useSearchIssues');

// Mock navigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Helper to create a complete mock return value
const createMockHookReturn = (overrides?: Partial<ReturnType<typeof useSearchIssuesModule.useSearchIssues>>) => ({
  issues: [],
  totalCount: 0,
  filters: {
    searchTerm: '',
    state: 'OPEN' as const,
    pageSize: 20,
    cursor: undefined,
  },
  searchTerm: '',
  state: 'OPEN' as const,
  pageInfo: {
    hasNextPage: false,
    hasPreviousPage: false,
    startCursor: null,
    endCursor: null,
  },
  hasNextPage: false,
  hasPreviousPage: false,
  isLoading: false,
  isFetching: false,
  error: null,
  setSearchTerm: vi.fn(),
  setState: vi.fn(),
  loadNextPage: vi.fn(),
  loadPreviousPage: vi.fn(),
  resetFilters: vi.fn(),
  refresh: vi.fn(),
  ...overrides,
});

describe('IssueSearchDemo - Issue Card', () => {
  const mockUseSearchIssues = vi.mocked(useSearchIssuesModule.useSearchIssues);

  beforeEach(() => {
    vi.clearAllMocks();
    mockNavigate.mockClear();
  });

  it('should render issue card with all metadata', () => {
    const mockIssue = createMockIssue({
      number: 123,
      title: 'Test Issue Title',
      state: 'OPEN',
      body: 'This is a test issue body',
      author: { login: 'testuser', avatarUrl: 'https://avatar.url' },
      comments: { totalCount: 5 },
    });

    mockUseSearchIssues.mockReturnValue(
      createMockHookReturn({
        issues: [mockIssue],
      })
    );

    render(<IssueSearchDemo />);

    // Check title
    expect(screen.getByText('Test Issue Title')).toBeInTheDocument();
    
    // Check issue number
    expect(screen.getByText('#123')).toBeInTheDocument();
    
    // Check state badge
    expect(screen.getByText('OPEN')).toBeInTheDocument();
    
    // Check body
    expect(screen.getByText('This is a test issue body')).toBeInTheDocument();
    
    // Check author
    expect(screen.getByText('testuser')).toBeInTheDocument();
    
    // Check comments count
    expect(screen.getByText('5 comments')).toBeInTheDocument();
  });

  it('should render issue labels with correct colors', () => {
    const mockIssue = createMockIssue({
      labels: {
        nodes: [
          { id: '1', name: 'bug', color: 'ff0000' },
          { id: '2', name: 'enhancement', color: '00ff00' },
        ],
      },
    });

    mockUseSearchIssues.mockReturnValue(
      createMockHookReturn({
        issues: [mockIssue],
      })
    );

    render(<IssueSearchDemo />);

    expect(screen.getByText('bug')).toBeInTheDocument();
    expect(screen.getByText('enhancement')).toBeInTheDocument();
  });

  it('should navigate to issue detail when card is clicked', async () => {
    const user = userEvent.setup();
    const mockIssue = createMockIssue({ number: 456, title: 'Clickable Issue' });

    mockUseSearchIssues.mockReturnValue(
      createMockHookReturn({
        issues: [mockIssue],
      })
    );

    render(<IssueSearchDemo />);

    // Click on the title
    const titleElement = screen.getByText('Clickable Issue');
    await user.click(titleElement);

    expect(mockNavigate).toHaveBeenCalledWith('/issues/456');
  });

  it('should render multiple issue cards', () => {
    const mockIssues = createMockIssues(3);

    mockUseSearchIssues.mockReturnValue(
      createMockHookReturn({
        issues: mockIssues,
      })
    );

    render(<IssueSearchDemo />);

    mockIssues.forEach((issue) => {
      expect(screen.getByText(issue.title)).toBeInTheDocument();
    });
  });

  it('should render closed state badge for closed issues', () => {
    const mockIssue = createMockIssue({
      state: 'CLOSED',
      title: 'Closed Issue',
    });

    mockUseSearchIssues.mockReturnValue(
      createMockHookReturn({
        issues: [mockIssue],
        state: 'CLOSED',
      })
    );

    render(<IssueSearchDemo />);

    expect(screen.getByText('CLOSED')).toBeInTheDocument();
  });

  it('should not render body when issue has no body', () => {
    const mockIssue = createMockIssue({
      title: 'Issue without body',
      body: '',
    });

    mockUseSearchIssues.mockReturnValue(
      createMockHookReturn({
        issues: [mockIssue],
      })
    );

    const { container } = render(<IssueSearchDemo />);

    expect(screen.getByText('Issue without body')).toBeInTheDocument();
    
    // Body section should not exist
    const bodyElements = container.querySelectorAll('[class*="IssueBody"]');
    expect(bodyElements.length).toBe(0);
  });

  it('should handle issue with unknown author', () => {
    const mockIssue = createMockIssue({
      author: null,
    });

    mockUseSearchIssues.mockReturnValue(
      createMockHookReturn({
        issues: [mockIssue],
      })
    );

    render(<IssueSearchDemo />);

    expect(screen.getByText('Unknown')).toBeInTheDocument();
  });

  it('should display "No issues found" when no issues are returned', () => {
    mockUseSearchIssues.mockReturnValue(
      createMockHookReturn({
        issues: [],
        searchTerm: 'nonexistent',
      })
    );

    render(<IssueSearchDemo />);

    expect(screen.getByText('No issues found')).toBeInTheDocument();
  });

  it('should display error message when error occurs', () => {
    mockUseSearchIssues.mockReturnValue(
      createMockHookReturn({
        issues: [],
        error: new Error('Failed to fetch issues'),
      })
    );

    render(<IssueSearchDemo />);

    expect(screen.getByText(/Error loading issues/i)).toBeInTheDocument();
  });
});
