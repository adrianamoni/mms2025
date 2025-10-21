import styled from 'styled-components';

export const CommentCard = styled.article`
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.background.default};
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  margin-bottom: ${({ theme }) => theme.spacing.md};

  &:last-child {
    margin-bottom: 0;
  }
`;

export const CommentHeader = styled.header`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  padding-bottom: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.subtle};
`;

export const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;

export const AuthorInfo = styled.div`
  flex: 1;
`;

export const AuthorName = styled.strong`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const CommentDate = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.tertiary};
  margin-left: ${({ theme }) => theme.spacing.sm};
`;

export const CommentBody = styled.div`
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: 1.6;
  font-size: ${({ theme }) => theme.typography.fontSize.base};

  /* Markdown styling */
  p {
    margin: ${({ theme }) => theme.spacing.sm} 0;
  }

  code {
    padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
    background: ${({ theme }) => theme.colors.background.paper};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    font-family: ${({ theme }) => theme.typography.fontFamily.mono};
    font-size: 0.9em;
  }

  pre {
    padding: ${({ theme }) => theme.spacing.md};
    background: ${({ theme }) => theme.colors.background.paper};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    overflow-x: auto;
    margin: ${({ theme }) => theme.spacing.md} 0;
    
    code {
      padding: 0;
      background: none;
    }
  }

  a {
    color: ${({ theme }) => theme.colors.primary.main};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
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
