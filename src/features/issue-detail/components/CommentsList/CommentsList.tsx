import type { FC } from 'react';
import type { IssueComment } from '@/shared/api/github-queries';
import { formatDate } from '@/shared/utils/styling';
import * as S from './CommentsList.styles';

type CommentsListProps = {
  comments: IssueComment[];
};

/**
 * CommentsList Component
 * Displays a list of issue comments with author info
 */
export const CommentsList: FC<CommentsListProps> = ({ comments }) => {
  if (comments.length === 0) {
    return (
      <S.EmptyState>
        <p>💬 No comments yet</p>
        <p>Be the first to share your thoughts!</p>
      </S.EmptyState>
    );
  }

  return (
    <div>
      {comments.map((comment) => (
        <S.CommentCard key={comment.id}>
          <S.CommentHeader>
            {comment.author && (
              <>
                <S.Avatar src={comment.author.avatarUrl} alt={comment.author.login} />
                <S.AuthorInfo>
                  <S.AuthorName>{comment.author.login}</S.AuthorName>
                  <S.CommentDate>commented {formatDate(comment.createdAt)}</S.CommentDate>
                </S.AuthorInfo>
              </>
            )}
            {!comment.author && (
              <S.AuthorInfo>
                <S.AuthorName>Unknown User</S.AuthorName>
                <S.CommentDate>commented {formatDate(comment.createdAt)}</S.CommentDate>
              </S.AuthorInfo>
            )}
          </S.CommentHeader>

          <S.CommentBody
            dangerouslySetInnerHTML={{ __html: comment.bodyHTML || comment.body }}
          />
        </S.CommentCard>
      ))}
    </div>
  );
};
