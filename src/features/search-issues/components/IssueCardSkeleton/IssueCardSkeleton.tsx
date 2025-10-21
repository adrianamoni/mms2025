import type { FC } from 'react'
import * as S from './IssueCardSkeleton.styles'

type IssueCardSkeletonProps = {
  showLabels?: boolean
}

/**
 * Skeleton component that mimics the structure of an issue card
 * Shows a loading state while issues are being fetched
 */
export const IssueCardSkeleton: FC<IssueCardSkeletonProps> = ({ 
  showLabels = true 
}) => {
  return (
    <S.SkeletonCard>
      {/* Header with avatar and title */}
      <S.SkeletonHeader>
        <S.SkeletonAvatar $size="32px" />
        <S.SkeletonTitleContainer>
          <S.SkeletonTitle $height="24px" />
        </S.SkeletonTitleContainer>
      </S.SkeletonHeader>

      {/* Body with text lines */}
      <S.SkeletonBody>
        <S.SkeletonBodyLine $height="14px" />
        <S.SkeletonBodyLine $height="14px" />
        <S.SkeletonBodyLine $height="14px" />
      </S.SkeletonBody>

      {/* Footer with metadata */}
      <S.SkeletonFooter>
        <S.SkeletonMetadata>
          <S.SkeletonBadge />
        </S.SkeletonMetadata>
        
        <S.SkeletonMetadata>
          <S.SkeletonBadge $width="40px" />
        </S.SkeletonMetadata>

        <S.SkeletonMetadata>
          <S.SkeletonBadge $width="100px" />
        </S.SkeletonMetadata>

        {/* Labels */}
        {showLabels && (
          <S.SkeletonMetadata>
            <S.SkeletonLabel />
            <S.SkeletonLabel />
          </S.SkeletonMetadata>
        )}
      </S.SkeletonFooter>
    </S.SkeletonCard>
  )
}
