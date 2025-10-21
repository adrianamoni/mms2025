import styled, { css } from 'styled-components';

/**
 * Button Variants
 */
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';

/**
 * Button Sizes
 */
type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Button Props for styled-component
 * Using transient props ($) to prevent them from being passed to DOM
 */
export type StyledButtonProps = {
  $variant?: ButtonVariant;
  $size?: ButtonSize;
  $fullWidth?: boolean;
};

/**
 * Button Props for React component
 */
export type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  disabled?: boolean;
};

/**
 * Get variant styles
 */
const getVariantStyles = (variant: ButtonVariant) => {
  const styles = {
    primary: css`
      background-color: ${({ theme }) => theme.colors.primary.main};
      color: ${({ theme }) => theme.colors.primary.contrast};
      border: 1px solid ${({ theme }) => theme.colors.primary.main};

      &:hover:not(:disabled) {
        background-color: ${({ theme }) => theme.colors.primary.dark};
        border-color: ${({ theme }) => theme.colors.primary.dark};
      }

      &:active:not(:disabled) {
        background-color: ${({ theme }) => theme.colors.primary.dark};
        transform: translateY(1px);
      }
    `,

    secondary: css`
      background-color: ${({ theme }) => theme.colors.secondary.main};
      color: ${({ theme }) => theme.colors.secondary.contrast};
      border: 1px solid ${({ theme }) => theme.colors.secondary.main};

      &:hover:not(:disabled) {
        background-color: ${({ theme }) => theme.colors.secondary.dark};
        border-color: ${({ theme }) => theme.colors.secondary.dark};
      }

      &:active:not(:disabled) {
        background-color: ${({ theme }) => theme.colors.secondary.dark};
        transform: translateY(1px);
      }
    `,

    outline: css`
      background-color: transparent;
      color: ${({ theme }) => theme.colors.primary.main};
      border: 1px solid ${({ theme }) => theme.colors.border.default};

      &:hover:not(:disabled) {
        background-color: ${({ theme }) => theme.colors.background.hover};
        border-color: ${({ theme }) => theme.colors.primary.main};
      }

      &:active:not(:disabled) {
        background-color: ${({ theme }) => theme.colors.background.subtle};
        transform: translateY(1px);
      }
    `,

    ghost: css`
      background-color: transparent;
      color: ${({ theme }) => theme.colors.text.secondary};
      border: 1px solid transparent;

      &:hover:not(:disabled) {
        background-color: ${({ theme }) => theme.colors.background.hover};
        color: ${({ theme }) => theme.colors.text.primary};
      }

      &:active:not(:disabled) {
        background-color: ${({ theme }) => theme.colors.background.subtle};
        transform: translateY(1px);
      }
    `,

    danger: css`
      background-color: ${({ theme }) => theme.colors.error.main};
      color: ${({ theme }) => theme.colors.neutral.white};
      border: 1px solid ${({ theme }) => theme.colors.error.main};

      &:hover:not(:disabled) {
        background-color: ${({ theme }) => theme.colors.error.dark};
        border-color: ${({ theme }) => theme.colors.error.dark};
      }

      &:active:not(:disabled) {
        background-color: ${({ theme }) => theme.colors.error.dark};
        transform: translateY(1px);
      }
    `,
  };

  return styles[variant];
};

/**
 * Get size styles
 */
const getSizeStyles = (size: ButtonSize) => {
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
 * Button Component
 */
export const Button = styled.button<StyledButtonProps>`
  /* Base styles */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  
  font-family: ${({ theme }) => theme.typography.fontFamily.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  line-height: 1;
  
  border-radius: ${({ theme }) => theme.borderRadius.md};
  
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
  
  transition: all ${({ theme }) => theme.transitions.duration.fast} ${({ theme }) => theme.transitions.easing.ease};

  /* Variant styles */
  ${({ $variant = 'primary' }) => getVariantStyles($variant)}

  /* Size styles */
  ${({ $size = 'md' }) => getSizeStyles($size)}

  /* Full width */
  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      width: 100%;
    `}

  /* Disabled state */
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  /* Focus visible */
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary.main};
    outline-offset: 2px;
  }
`;

/**
 * Icon Button - Square button for icons only
 */
export const IconButton = styled(Button)`
  padding: ${({ theme }) => theme.spacing.sm};
  width: ${({ $size = 'md' }) => 
    $size === 'sm' ? '32px' : $size === 'lg' ? '48px' : '40px'};
  height: ${({ $size = 'md' }) => 
    $size === 'sm' ? '32px' : $size === 'lg' ? '48px' : '40px'};
`;
