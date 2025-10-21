import type { FC } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useIssueDetail } from '@/features/issue-detail/hooks/useIssueDetail';
import { Badge } from '@/shared/ui/Badge/Badge';
import { Button } from '@/shared/ui/Button/Button';
import { formatDate, getContrastColor, sanitizeGitHubHTML } from '@/shared/utils/styling';
import { CommentsList } from '@/features/issue-detail/components/CommentsList/CommentsList';
import { CommentSkeleton } from '@/features/issue-detail/components/CommentSkeleton/CommentSkeleton';
import * as S from '@/features/issue-detail/components/IssueDetail.styles';

/**
 * Issue Detail Page Component
 * Displays full issue information with comments
 * Leverages React Query cache for instant initial render
 */
export const IssueDetail: FC = () => {
  const { issueNumber } = useParams<{ issueNumber: string }>();
  const navigate = useNavigate();
  const issueNum = issueNumber ? parseInt(issueNumber, 10) : 0;

  const {
    issue,
    comments,
    commentsTotal,
    isLoading,
    isFetching,
    error,
  } = useIssueDetail(issueNum);

  const handleBack = () => {
    navigate(-1);
  };

  if (error) {
    return (
      <S.Container>
        <S.BackButton onClick={handleBack}>
          ← Back
        </S.BackButton>
        <S.ErrorContainer>
          <h3>Error loading issue</h3>
          <p>{error.message}</p>
          <Button onClick={handleBack} variant="danger">
            Go Back
          </Button>
        </S.ErrorContainer>
      </S.Container>
    );
  }

  if (!issue && isLoading) {
    return (
      <S.Container>
        <S.BackButton onClick={handleBack}>
          ← Back
        </S.BackButton>
        <S.LoadingContainer>
          <p>Loading issue...</p>
        </S.LoadingContainer>
      </S.Container>
    );
  }

  if (!issue) {
    return (
      <S.Container>
        <S.BackButton onClick={handleBack}>
          ← Back
        </S.BackButton>
        <S.ErrorContainer>
          <h3>Issue not found</h3>
          <p>The issue #{issueNum} could not be found.</p>
          <Button onClick={handleBack} variant="primary">
            Go Back
          </Button>
        </S.ErrorContainer>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.BackButton onClick={handleBack}>
        ← Back to Issues
      </S.BackButton>

      <S.IssueHeader>
        <S.TitleRow>
          <S.Title>
            {issue.title}
          </S.Title>
          <Badge variant={issue.state === 'OPEN' ? 'open' : 'closed'} size="md">
            {issue.state}
          </Badge>
        </S.TitleRow>

        <S.IssueNumber>#{issue.number}</S.IssueNumber>

        <S.Metadata>
          {issue.author && (
            <S.MetadataItem>
              <S.Avatar src={issue.author.avatarUrl} alt={issue.author.login} />
              <strong>{issue.author.login}</strong>
              <span>opened this issue</span>
            </S.MetadataItem>
          )}
          <S.MetadataItem>
            <span>📅 {formatDate(issue.createdAt)}</span>
          </S.MetadataItem>
          {issue.closedAt && (
            <S.MetadataItem>
              <span>🔒 Closed on {formatDate(issue.closedAt)}</span>
            </S.MetadataItem>
          )}
          <S.MetadataItem>
            <span>💬 {commentsTotal} {commentsTotal === 1 ? 'comment' : 'comments'}</span>
          </S.MetadataItem>
          {issue.reactions && (
            <S.MetadataItem>
              <span>👍 {issue.reactions.totalCount} reactions</span>
            </S.MetadataItem>
          )}
        </S.Metadata>

        {/* Labels */}
        {issue.labels && issue.labels.nodes.length > 0 && (
          <S.LabelsRow>
            {issue.labels.nodes.map((label) => (
              <Badge
                key={label.id}
                size="sm"
                style={{
                  backgroundColor: `#${label.color}`,
                  color: getContrastColor(label.color),
                }}
              >
                {label.name}
              </Badge>
            ))}
          </S.LabelsRow>
        )}
      </S.IssueHeader>

      <S.Content>
        <S.MainContent>
          {/* Issue Body */}
          <S.BodySection>
            <S.BodyContent
              dangerouslySetInnerHTML={{ 
                __html: sanitizeGitHubHTML(issue.bodyHTML || issue.body || '<p><em>No description provided</em></p>')
              }}
            />
          </S.BodySection>

          {/* Comments */}
          <S.CommentsSection>
            <S.SectionTitle>
              Comments ({isFetching && comments.length === 0 ? '...' : commentsTotal})
              {isFetching && comments.length > 0 && (
                <S.LoadingIndicator>Updating...</S.LoadingIndicator>
              )}
            </S.SectionTitle>
            {isFetching && comments.length === 0 ? (
              <CommentSkeleton count={3} />
            ) : (
              <CommentsList comments={comments} />
            )}
          </S.CommentsSection>
        </S.MainContent>
      </S.Content>
    </S.Container>
  );
};
