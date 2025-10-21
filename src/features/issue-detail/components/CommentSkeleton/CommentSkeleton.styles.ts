import styled from 'styled-components';
import { SkeletonBase, SkeletonCircle } from '@/shared/ui/components/Skeleton/Skeleton.styles';

export const SkeletonCommentCard = styled.article`
  padding: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.background.default};
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  &:last-child {
    margin-bottom: 0;
  }
`;

export const SkeletonHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  padding-bottom: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.subtle};
`;

export const SkeletonAvatar = styled(SkeletonCircle)`
  flex-shrink: 0;
  width: 40px;
  height: 40px;
`;

export const SkeletonAuthorInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const SkeletonBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const SkeletonLine = styled(SkeletonBase)`
  &:last-child {
    width: 70%;
  }
`;
