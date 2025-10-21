import styled, { css } from 'styled-components';

/**
 * Input Sizes
 */
type InputSize = 'sm' | 'md' | 'lg';

/**
 * Input Props
 */
export type InputProps = {
  size?: InputSize;
  hasError?: boolean;
  fullWidth?: boolean;
};

/**
 * Get size styles
 */
const getSizeStyles = (size: InputSize) => {
  const styles = {
    sm: css`
      padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
      font-size: ${({ theme }) => theme.typography.fontSize.sm};
      height: 32px;
    `,

    md: css`
      padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
      font-size: ${({ theme }) => theme.typography.fontSize.base};
      height: 40px;
    `,

    lg: css`
      padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
      font-size: ${({ theme }) => theme.typography.fontSize.lg};
      height: 48px;
    `,
  };

  return styles[size];
};

/**
 * Input Component
 */
export const Input = styled.input<InputProps>`
  /* Base styles */
  display: block;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  
  font-family: ${({ theme }) => theme.typography.fontFamily.base};
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
  color: ${({ theme }) => theme.colors.text.primary};
  
  background-color: ${({ theme }) => theme.colors.background.default};
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  
  transition: all ${({ theme }) => theme.transitions.duration.fast} ${({ theme }) => theme.transitions.easing.ease};

  /* Size styles */
  ${({ size = 'md' }) => getSizeStyles(size)}

  /* Error state */
  ${({ hasError }) =>
    hasError &&
    css`
      border-color: ${({ theme }) => theme.colors.error.main};
      
      &:focus {
        outline-color: ${({ theme }) => theme.colors.error.main};
        border-color: ${({ theme }) => theme.colors.error.main};
      }
    `}

  /* Focus state */
  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary.main};
    outline-offset: 0;
    border-color: ${({ theme }) => theme.colors.primary.main};
  }

  /* Disabled state */
  &:disabled {
    background-color: ${({ theme }) => theme.colors.background.subtle};
    color: ${({ theme }) => theme.colors.text.disabled};
    cursor: not-allowed;
    opacity: 0.6;
  }

  /* Placeholder */
  &::placeholder {
    color: ${({ theme }) => theme.colors.text.tertiary};
  }

  /* Hover state */
  &:hover:not(:disabled):not(:focus) {
    border-color: ${({ theme }) => theme.colors.border.strong};
  }
`;

/**
 * Textarea Component
 */
export const Textarea = styled.textarea<InputProps>`
  /* Base styles */
  display: block;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  min-height: 100px;
  resize: vertical;
  
  font-family: ${({ theme }) => theme.typography.fontFamily.base};
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
  color: ${({ theme }) => theme.colors.text.primary};
  
  background-color: ${({ theme }) => theme.colors.background.default};
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  
  transition: all ${({ theme }) => theme.transitions.duration.fast} ${({ theme }) => theme.transitions.easing.ease};

  /* Size styles */
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  font-size: ${({ theme }) => theme.typography.fontSize.base};

  /* Error state */
  ${({ hasError }) =>
    hasError &&
    css`
      border-color: ${({ theme }) => theme.colors.error.main};
      
      &:focus {
        outline-color: ${({ theme }) => theme.colors.error.main};
        border-color: ${({ theme }) => theme.colors.error.main};
      }
    `}

  /* Focus state */
  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary.main};
    outline-offset: 0;
    border-color: ${({ theme }) => theme.colors.primary.main};
  }

  /* Disabled state */
  &:disabled {
    background-color: ${({ theme }) => theme.colors.background.subtle};
    color: ${({ theme }) => theme.colors.text.disabled};
    cursor: not-allowed;
    opacity: 0.6;
  }

  /* Placeholder */
  &::placeholder {
    color: ${({ theme }) => theme.colors.text.tertiary};
  }

  /* Hover state */
  &:hover:not(:disabled):not(:focus) {
    border-color: ${({ theme }) => theme.colors.border.strong};
  }
`;

/**
 * Input Container
 */
export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

/**
 * Input Label
 */
export const InputLabel = styled.label`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

/**
 * Input Error Message
 */
export const InputError = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.error.main};
`;

/**
 * Input Helper Text
 */
export const InputHelperText = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.tertiary};
`;
