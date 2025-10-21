import type { FC } from 'react';
import * as S from './CommentSkeleton.styles';

type CommentSkeletonProps = {
  count?: number;
};

/**
 * Comment Skeleton Component
 * Shows loading state for comments
 */
export const CommentSkeleton: FC<CommentSkeletonProps> = ({ count = 3 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <S.SkeletonCommentCard key={index}>
          <S.SkeletonHeader>
            <S.SkeletonAvatar $size="32px" />
            <S.SkeletonAuthorInfo>
              <S.SkeletonLine $width="120px" $height="14px" />
              <S.SkeletonLine $width="180px" $height="12px" />
            </S.SkeletonAuthorInfo>
          </S.SkeletonHeader>

          <S.SkeletonBody>
            <S.SkeletonLine $height="14px" />
            <S.SkeletonLine $height="14px" />
            <S.SkeletonLine $height="14px" />
          </S.SkeletonBody>
        </S.SkeletonCommentCard>
      ))}
    </>
  );
};
