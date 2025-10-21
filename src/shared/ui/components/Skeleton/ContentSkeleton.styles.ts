import styled from 'styled-components';
import { SkeletonBase } from './Skeleton.styles';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const ParagraphBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const Line = styled(SkeletonBase)``;

export const CodeBlock = styled(SkeletonBase)`
  height: 120px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

export const ListBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  padding-left: ${({ theme }) => theme.spacing.lg};
`;

export const ListItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const Bullet = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.border.default};
  flex-shrink: 0;
`;

export const HeadingLine = styled(SkeletonBase)`
  height: 24px;
`;
