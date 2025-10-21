import styled from 'styled-components';
import { SkeletonBase, SkeletonCircle } from './Skeleton.styles';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`;

export const HeaderSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.background.paper};
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
`;

export const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const Title = styled(SkeletonBase)`
  height: 32px;
  flex: 1;
`;

export const Badge = styled(SkeletonBase)`
  width: 80px;
  height: 28px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
`;

export const IssueNumber = styled(SkeletonBase)`
  width: 80px;
  height: 16px;
`;

export const MetadataRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  flex-wrap: wrap;
`;

export const MetadataItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const Avatar = styled(SkeletonCircle)`
  width: 20px;
  height: 20px;
`;

export const MetadataText = styled(SkeletonBase)`
  width: 120px;
  height: 14px;
`;

export const LabelsRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
`;

export const Label = styled(SkeletonBase)`
  width: 100px;
  height: 24px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

export const BodySection = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.background.paper};
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
`;
