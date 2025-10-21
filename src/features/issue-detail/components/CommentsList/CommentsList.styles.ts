import styled from 'styled-components';

export const CommentCard = styled.article`
  padding: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.background.default};
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  transition: all ${({ theme }) => theme.transitions.duration.base} ${({ theme }) => theme.transitions.easing.ease};

  &:hover {
    border-color: ${({ theme }) => theme.colors.border.strong};
    box-shadow: ${({ theme }) => theme.shadows.sm};
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

export const CommentHeader = styled.header`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  padding-bottom: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.subtle};
`;

export const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.colors.border.subtle};
  flex-shrink: 0;
`;

export const AuthorInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const AuthorName = styled.strong`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const CommentDate = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.tertiary};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  
  &::before {
    content: '💬';
  }
`;

export const CommentBody = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  font-size: ${({ theme }) => theme.typography.fontSize.base};

  /* Markdown styling */
  p {
    margin: ${({ theme }) => theme.spacing.md} 0;
    
    &:last-child {
      margin-bottom: 0;
    }
  }

  code {
    padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
    background: ${({ theme }) => theme.colors.background.subtle};
    border: 1px solid ${({ theme }) => theme.colors.border.subtle};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
    font-size: 0.9em;
    color: ${({ theme }) => theme.colors.text.primary};
  }

  pre {
    padding: ${({ theme }) => theme.spacing.lg};
    background: ${({ theme }) => theme.colors.background.subtle};
    border: 1px solid ${({ theme }) => theme.colors.border.subtle};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    overflow-x: auto;
    margin: ${({ theme }) => theme.spacing.md} 0;
    
    code {
      padding: 0;
      background: none;
      border: none;
    }
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: ${({ theme }) => theme.borderRadius.md};
    margin: ${({ theme }) => theme.spacing.md} 0;
    box-shadow: ${({ theme }) => theme.shadows.sm};
  }

  blockquote {
    border-left: 3px solid ${({ theme }) => theme.colors.border.strong};
    padding-left: ${({ theme }) => theme.spacing.md};
    margin: ${({ theme }) => theme.spacing.md} 0;
    color: ${({ theme }) => theme.colors.text.tertiary};
  }

  ul, ol {
    padding-left: ${({ theme }) => theme.spacing.xl};
    margin: ${({ theme }) => theme.spacing.md} 0;
  }

  li {
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }

  a {
    color: ${({ theme }) => theme.colors.primary.main};
    text-decoration: none;
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};

    &:hover {
      text-decoration: underline;
      color: ${({ theme }) => theme.colors.primary.light};
    }
  }

  h1, h2, h3, h4, h5, h6 {
    margin-top: ${({ theme }) => theme.spacing.lg};
    margin-bottom: ${({ theme }) => theme.spacing.md};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

export const EmptyState = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  color: ${({ theme }) => theme.colors.text.tertiary};
  background: ${({ theme }) => theme.colors.background.paper};
  border: 1px dashed ${({ theme }) => theme.colors.border.default};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
`;

export const SearchContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-family: ${({ theme }) => theme.typography.fontFamily.base};
  color: ${({ theme }) => theme.colors.text.primary};
  background-color: ${({ theme }) => theme.colors.background.default};
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all ${({ theme }) => theme.transitions.duration.fast} ${({ theme }) => theme.transitions.easing.ease};

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.tertiary};
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary.main};
    outline-offset: 0;
    border-color: ${({ theme }) => theme.colors.primary.main};
  }

  &:hover:not(:focus) {
    border-color: ${({ theme }) => theme.colors.border.strong};
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing.lg};
  padding-top: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.border.default};
`;

export const PaginationInfo = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`;

export const PaginationButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`;
