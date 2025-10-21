import type { FC } from 'react';
import * as S from './ContentSkeleton.styles';

type ContentSkeletonProps = {
  /**
   * Number of content blocks to show (paragraphs, lists, code blocks)
   * @default 3
   */
  blocks?: number;
  /**
   * Whether to show a heading at the start
   * @default false
   */
  showHeading?: boolean;
  /**
   * Whether to include a code block
   * @default true
   */
  includeCodeBlock?: boolean;
};

/**
 * ContentSkeleton Component
 * Generic skeleton for HTML content like issue bodies or descriptions
 * Simulates paragraphs, lists, headings, and code blocks
 */
export const ContentSkeleton: FC<ContentSkeletonProps> = ({
  blocks = 3,
  showHeading = false,
  includeCodeBlock = true,
}) => {
  return (
    <S.Container>
      {/* Optional heading */}
      {showHeading && (
        <S.HeadingLine $width="40%" />
      )}

      {/* First paragraph block */}
      <S.ParagraphBlock>
        <S.Line $width="100%" $height="16px" />
        <S.Line $width="95%" $height="16px" />
        <S.Line $width="98%" $height="16px" />
        <S.Line $width="85%" $height="16px" />
      </S.ParagraphBlock>

      {blocks >= 2 && (
        <>
          {/* List block */}
          <S.ListBlock>
            {[...Array(4)].map((_, index) => (
              <S.ListItem key={`list-${index}`}>
                <S.Bullet />
                <S.Line $width={`${90 - index * 5}%`} $height="14px" />
              </S.ListItem>
            ))}
          </S.ListBlock>
        </>
      )}

      {blocks >= 3 && (
        <>
          {/* Second paragraph */}
          <S.ParagraphBlock>
            <S.Line $width="100%" $height="16px" />
            <S.Line $width="92%" $height="16px" />
            <S.Line $width="75%" $height="16px" />
          </S.ParagraphBlock>
        </>
      )}

      {includeCodeBlock && blocks >= 2 && (
        <S.CodeBlock />
      )}

      {blocks >= 4 && (
        <>
          {/* Third paragraph */}
          <S.ParagraphBlock>
            <S.Line $width="100%" $height="16px" />
            <S.Line $width="97%" $height="16px" />
            <S.Line $width="88%" $height="16px" />
            <S.Line $width="70%" $height="16px" />
          </S.ParagraphBlock>
        </>
      )}
    </S.Container>
  );
};
