import type { FC, ButtonHTMLAttributes } from 'react';
import * as S from './Button.styles';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & S.ButtonProps;

/**
 * Button Component
 * Reusable button with multiple variants and sizes
 */
export const Button: FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  fullWidth = false,
  disabled = false,
  ...props 
}) => {
  return (
    <S.Button
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      disabled={disabled}
      {...props}
    >
      {children}
    </S.Button>
  );
};
