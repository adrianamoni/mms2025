import styled from 'styled-components'
import { SkeletonBase, SkeletonCircle } from '@/shared/ui/components/Skeleton/Skeleton.styles'

export const SkeletonCard = styled.div`
  background: ${({ theme }) => theme.colors.background.default};
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  transition: all ${({ theme }) => theme.transitions.duration.base} ${({ theme }) => theme.transitions.easing.easeInOut};

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.md};
    border-color: ${({ theme }) => theme.colors.border.strong};
  }
`

export const SkeletonHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

export const SkeletonAvatar = styled(SkeletonCircle)`
  flex-shrink: 0;
`

export const SkeletonTitleContainer = styled.div`
  flex: 1;
  min-width: 0;
`

export const SkeletonTitle = styled(SkeletonBase)`
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

export const SkeletonBody = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

export const SkeletonBodyLine = styled(SkeletonBase)`
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  
  &:last-child {
    width: 60%;
  }
`

export const SkeletonFooter = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  flex-wrap: wrap;
`

export const SkeletonMetadata = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`

export const SkeletonBadge = styled(SkeletonBase)`
  display: inline-block;
  width: 60px;
  height: 24px;
`

export const SkeletonLabel = styled(SkeletonBase)`
  display: inline-block;
  width: 80px;
  height: 20px;
  margin-right: ${({ theme }) => theme.spacing.xs};
  border-radius: ${({ theme }) => theme.borderRadius.full};
`
