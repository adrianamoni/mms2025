import styled, { keyframes } from 'styled-components'

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`

export const SkeletonBase = styled.div<{
  $width?: string
  $height?: string
  $borderRadius?: string
  $marginBottom?: string
}>`
  display: inline-block;
  width: ${({ $width }) => $width || '100%'};
  height: ${({ $height }) => $height || '20px'};
  border-radius: ${({ $borderRadius, theme }) => $borderRadius || theme.borderRadius.sm};
  margin-bottom: ${({ $marginBottom }) => $marginBottom || '0'};
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.neutral.gray[200]} 0%,
    ${({ theme }) => theme.colors.neutral.gray[100]} 50%,
    ${({ theme }) => theme.colors.neutral.gray[200]} 100%
  );
  background-size: 1000px 100%;
  animation: ${shimmer} 2s infinite linear;
`

export const SkeletonCircle = styled(SkeletonBase)<{ $size?: string }>`
  width: ${({ $size }) => $size || '40px'};
  height: ${({ $size }) => $size || '40px'};
  border-radius: 50%;
`

export const SkeletonText = styled(SkeletonBase)<{ $lines?: number }>`
  &:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }

  &:last-child {
    width: 70%;
  }
`

export const SkeletonContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
`
