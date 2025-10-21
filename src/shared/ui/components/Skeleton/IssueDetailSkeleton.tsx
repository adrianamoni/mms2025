import type { FC } from 'react';
import { ContentSkeleton } from './ContentSkeleton';
import * as S from './IssueDetailSkeleton.styles';

/**
 * IssueDetailSkeleton Component
 * Complete skeleton for the issue detail page
 * Shows loading state for header, metadata, and body content
 */
export const IssueDetailSkeleton: FC = () => {
  return (
    <S.Container>
      {/* Header Skeleton */}
      <S.HeaderSection>
        {/* Title and Badge */}
        <S.TitleRow>
          <S.Title $width="60%" />
          <S.Badge />
        </S.TitleRow>

        {/* Issue Number */}
        <S.IssueNumber />

        {/* Metadata */}
        <S.MetadataRow>
          <S.MetadataItem>
            <S.Avatar $size="20px" />
            <S.MetadataText />
          </S.MetadataItem>
          <S.MetadataItem>
            <S.MetadataText $width="100px" />
          </S.MetadataItem>
          <S.MetadataItem>
            <S.MetadataText $width="140px" />
          </S.MetadataItem>
        </S.MetadataRow>

        {/* Labels */}
        <S.LabelsRow>
          <S.Label $width="80px" />
          <S.Label $width="100px" />
          <S.Label $width="90px" />
        </S.LabelsRow>
      </S.HeaderSection>

      {/* Body Skeleton */}
      <S.BodySection>
        <ContentSkeleton blocks={3} includeCodeBlock />
      </S.BodySection>
    </S.Container>
  );
};
