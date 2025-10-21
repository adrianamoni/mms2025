import type { FC, InputHTMLAttributes } from 'react';
import * as S from './Input.styles';

type InputSize = 'sm' | 'md' | 'lg';

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  size?: InputSize;
  hasError?: boolean;
  fullWidth?: boolean;
  label?: string;
  error?: string;
  helperText?: string;
};

/**
 * Input Component
 * Text input with label, error, and helper text support
 */
export const Input: FC<InputProps> = ({ 
  label,
  error,
  helperText,
  size = 'md',
  fullWidth = false,
  hasError,
  id,
  ...props 
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  const showError = hasError || !!error;

  return (
    <S.InputContainer>
      {label && <S.InputLabel htmlFor={inputId}>{label}</S.InputLabel>}
      <S.Input
        id={inputId}
        size={size}
        fullWidth={fullWidth}
        hasError={showError}
        {...props}
      />
      {error && <S.InputError>{error}</S.InputError>}
      {helperText && !error && <S.InputHelperText>{helperText}</S.InputHelperText>}
    </S.InputContainer>
  );
};
