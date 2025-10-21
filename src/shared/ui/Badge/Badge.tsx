import type { FC, HTMLAttributes } from 'react';
import * as S from './Badge.styles';

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & S.BadgeProps;

/**
 * Badge Component
 * Small label for status, categories, or metadata
 */
export const Badge: FC<BadgeProps> = ({ 
  children, 
  variant = 'default',
  size = 'md',
  ...props 
}) => {
  return (
    <S.Badge
      $variant={variant}
      $size={size}
      {...props}
    >
      {children}
    </S.Badge>
  );
};
