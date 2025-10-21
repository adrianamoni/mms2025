import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};
`;

export const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.background.default};
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${({ theme }) => theme.typography.fontFamily.base};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.duration.fast} ${({ theme }) => theme.transitions.easing.ease};

  &:hover {
    background: ${({ theme }) => theme.colors.background.hover};
    border-color: ${({ theme }) => theme.colors.border.strong};
  }
`;

export const IssueHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const TitleRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const Title = styled.h1`
  flex: 1;
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`;

export const IssueNumber = styled.span`
  color: ${({ theme }) => theme.colors.text.tertiary};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
`;

export const Metadata = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  flex-wrap: wrap;
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`;

export const MetadataItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const Avatar = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50%;
`;

export const LabelsRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  flex-wrap: wrap;
  margin-top: ${({ theme }) => theme.spacing.md};
`;

export const Content = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

export const MainContent = styled.div`
  width: 100%;
`;

export const BodySection = styled.section`
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.background.default};
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const BodyContent = styled.div`
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: 1.6;
  
  /* Markdown styling */
  p {
    margin: ${({ theme }) => theme.spacing.md} 0;
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
    
    code {
      padding: 0;
      background: none;
    }
  }
`;

export const CommentsSection = styled.section`
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

export const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.lg} 0;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const LoadingIndicator = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
  color: ${({ theme }) => theme.colors.text.tertiary};
  animation: pulse 1.5s ease-in-out infinite;

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
`;

export const ErrorContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.error.background};
  border: 1px solid ${({ theme }) => theme.colors.error.main};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  color: ${({ theme }) => theme.colors.error.dark};
  text-align: center;

  h3 {
    margin: 0 0 ${({ theme }) => theme.spacing.md} 0;
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
  }

  p {
    margin: 0 0 ${({ theme }) => theme.spacing.lg} 0;
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;
