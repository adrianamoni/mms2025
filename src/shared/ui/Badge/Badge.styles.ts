import styled, { css } from 'styled-components';

/**
 * Badge Variants
 */
type BadgeVariant = 'default' | 'success' | 'error' | 'warning' | 'info' | 'open' | 'closed';

/**
 * Badge Sizes
 */
type BadgeSize = 'sm' | 'md' | 'lg';

/**
 * Badge Props for styled-component
 * Using transient props ($) to prevent them from being passed to DOM
 */
export type StyledBadgeProps = {
  $variant?: BadgeVariant;
  $size?: BadgeSize;
};

/**
 * Badge Props for React component
 */
export type BadgeProps = {
  variant?: BadgeVariant;
  size?: BadgeSize;
};

/**
 * Get variant styles
 */
const getVariantStyles = (variant: BadgeVariant) => {
  const styles = {
    default: css`
      background-color: ${({ theme }) => theme.colors.neutral.gray[100]};
      color: ${({ theme }) => theme.colors.text.secondary};
    `,

    success: css`
      background-color: ${({ theme }) => theme.colors.success.background};
      color: ${({ theme }) => theme.colors.success.dark};
    `,

    error: css`
      background-color: ${({ theme }) => theme.colors.error.background};
      color: ${({ theme }) => theme.colors.error.dark};
    `,

    warning: css`
      background-color: ${({ theme }) => theme.colors.warning.background};
      color: ${({ theme }) => theme.colors.warning.dark};
    `,

    info: css`
      background-color: ${({ theme }) => theme.colors.info.background};
      color: ${({ theme }) => theme.colors.info.dark};
    `,

    open: css`
      background-color: ${({ theme }) => theme.colors.issue.openBg};
      color: ${({ theme }) => theme.colors.issue.open};
    `,

    closed: css`
      background-color: ${({ theme }) => theme.colors.issue.closedBg};
      color: ${({ theme }) => theme.colors.issue.closed};
    `,
  };

  return styles[variant];
};

/**
 * Get size styles
 */
const getSizeStyles = (size: BadgeSize) => {
  const styles = {
    sm: css`
      padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
      font-size: ${({ theme }) => theme.typography.fontSize.xs};
    `,

    md: css`
      padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
      font-size: ${({ theme }) => theme.typography.fontSize.sm};
    `,

    lg: css`
      padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
      font-size: ${({ theme }) => theme.typography.fontSize.base};
    `,
  };

  return styles[size];
};

/**
 * Badge Component
 */
export const Badge = styled.span<StyledBadgeProps>`
  /* Base styles */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xs};
  
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  line-height: 1;
  white-space: nowrap;
  
  border-radius: ${({ theme }) => theme.borderRadius.full};
  
  /* Variant styles */
  ${({ $variant = 'default' }) => getVariantStyles($variant)}

  /* Size styles */
  ${({ $size = 'md' }) => getSizeStyles($size)}
`;
