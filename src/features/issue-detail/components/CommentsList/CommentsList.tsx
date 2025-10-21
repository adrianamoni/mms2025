import { useState, useMemo, type FC } from 'react';
import type { IssueComment } from '@/shared/api/github-queries';
import { formatDate, sanitizeGitHubHTML } from '@/shared/utils/styling';
import { Button } from '@/shared/ui/Button/Button';
import * as S from './CommentsList.styles';

type CommentsListProps = {
  comments: IssueComment[];
  isLoading?: boolean;
};

const COMMENTS_PER_PAGE = 10;

/**
 * CommentsList Component
 * Displays a list of issue comments with author info, search, and pagination
 */
export const CommentsList: FC<CommentsListProps> = ({ comments, isLoading = false }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter comments based on search term
  const filteredComments = useMemo(() => {
    if (!searchTerm.trim()) {
      return comments;
    }

    const term = searchTerm.toLowerCase();
    return comments.filter((comment) => {
      const bodyMatch = comment.body.toLowerCase().includes(term);
      const authorMatch = comment.author?.login.toLowerCase().includes(term);
      return bodyMatch || authorMatch;
    });
  }, [comments, searchTerm]);

  // Paginate filtered comments
  const paginatedComments = useMemo(() => {
    const startIndex = (currentPage - 1) * COMMENTS_PER_PAGE;
    const endIndex = startIndex + COMMENTS_PER_PAGE;
    return filteredComments.slice(startIndex, endIndex);
  }, [filteredComments, currentPage]);

  const totalPages = Math.ceil(filteredComments.length / COMMENTS_PER_PAGE);
  const startIndex = (currentPage - 1) * COMMENTS_PER_PAGE + 1;
  const endIndex = Math.min(currentPage * COMMENTS_PER_PAGE, filteredComments.length);

  // Reset to page 1 when search changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  if (comments.length === 0 && !isLoading) {
    return (
      <S.EmptyState>
        <p>💬 No comments yet</p>
        <p>Be the first to share your thoughts!</p>
      </S.EmptyState>
    );
  }

  return (
    <div>
      {/* Search Input */}
      {comments.length > 0 && (
        <S.SearchContainer>
          <S.SearchInput
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search comments by author or content..."
          />
        </S.SearchContainer>
      )}

      {/* Comments List */}
      {filteredComments.length === 0 && searchTerm && (
        <S.EmptyState>
          <p>🔍 No comments found</p>
          <p>Try a different search term</p>
        </S.EmptyState>
      )}

      {paginatedComments.map((comment) => (
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
            dangerouslySetInnerHTML={{ 
              __html: sanitizeGitHubHTML(comment.bodyHTML || comment.body)
            }}
          />
        </S.CommentCard>
      ))}

      {/* Pagination */}
      {filteredComments.length > COMMENTS_PER_PAGE && (
        <S.PaginationContainer>
          <S.PaginationInfo>
            Showing {startIndex}-{endIndex} of {filteredComments.length} comments
            {searchTerm && ` (filtered from ${comments.length})`}
          </S.PaginationInfo>

          <S.PaginationButtons>
            <Button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              variant="secondary"
              size="sm"
            >
              Previous
            </Button>
            <Button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              variant="secondary"
              size="sm"
            >
              Next
            </Button>
          </S.PaginationButtons>
        </S.PaginationContainer>
      )}
    </div>
  );
};
