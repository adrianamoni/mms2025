import type { FC } from 'react'
import * as S from './Skeleton.styles'

type SkeletonProps = {
  width?: string
  height?: string
  borderRadius?: string
  marginBottom?: string
}

export const Skeleton: FC<SkeletonProps> = ({
  width,
  height,
  borderRadius,
  marginBottom,
}) => {
  return (
    <S.SkeletonBase
      $width={width}
      $height={height}
      $borderRadius={borderRadius}
      $marginBottom={marginBottom}
    />
  )
}

type SkeletonCircleProps = {
  size?: string
}

export const SkeletonCircle: FC<SkeletonCircleProps> = ({ size }) => {
  return <S.SkeletonCircle $size={size} />
}

type SkeletonTextProps = {
  lines?: number
  width?: string
  height?: string
}

export const SkeletonText: FC<SkeletonTextProps> = ({ 
  lines = 1,
  width,
  height = '16px'
}) => {
  return (
    <>
      {Array.from({ length: lines }).map((_, index) => (
        <S.SkeletonText
          key={index}
          $width={width}
          $height={height}
        />
      ))}
    </>
  )
}
