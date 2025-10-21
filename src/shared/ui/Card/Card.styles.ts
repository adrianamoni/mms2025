import styled, { css } from 'styled-components';

/**
 * Card Variants
 */
type CardVariant = 'default' | 'outlined' | 'elevated';

/**
 * Card Props
 */
export type CardProps = {
  variant?: CardVariant;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean;
  clickable?: boolean;
};

/**
 * Get variant styles
 */
const getVariantStyles = (variant: CardVariant) => {
  const styles = {
    default: css`
      background-color: ${({ theme }) => theme.colors.background.paper};
      border: 1px solid ${({ theme }) => theme.colors.border.subtle};
      box-shadow: none;
    `,

    outlined: css`
      background-color: ${({ theme }) => theme.colors.background.default};
      border: 1px solid ${({ theme }) => theme.colors.border.default};
      box-shadow: none;
    `,

    elevated: css`
      background-color: ${({ theme }) => theme.colors.background.default};
      border: 1px solid ${({ theme }) => theme.colors.border.subtle};
      box-shadow: ${({ theme }) => theme.shadows.base};
    `,
  };

  return styles[variant];
};

/**
 * Get padding styles
 */
const getPaddingStyles = (padding: CardProps['padding']) => {
  const styles = {
    none: css`
      padding: 0;
    `,
    sm: css`
      padding: ${({ theme }) => theme.spacing.sm};
    `,
    md: css`
      padding: ${({ theme }) => theme.spacing.md};
    `,
    lg: css`
      padding: ${({ theme }) => theme.spacing.lg};
    `,
  };

  return styles[padding || 'md'];
};

/**
 * Card Component
 */
export const Card = styled.article<CardProps>`
  /* Base styles */
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  transition: all ${({ theme }) => theme.transitions.duration.base} ${({ theme }) => theme.transitions.easing.ease};

  /* Variant styles */
  ${({ variant = 'default' }) => getVariantStyles(variant)}

  /* Padding styles */
  ${({ padding = 'md' }) => getPaddingStyles(padding)}

  /* Hoverable effect */
  ${({ hoverable, clickable }) =>
    (hoverable || clickable) &&
    css`
      &:hover {
        box-shadow: ${({ theme }) => theme.shadows.md};
        border-color: ${({ theme }) => theme.colors.border.strong};
        transform: translateY(-2px);
      }
    `}

  /* Clickable cursor */
  ${({ clickable }) =>
    clickable &&
    css`
      cursor: pointer;
      user-select: none;

      &:active {
        transform: translateY(0);
      }
    `}
`;

/**
 * Card Header
 */
export const CardHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  padding-bottom: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.subtle};
`;

/**
 * Card Title
 */
export const CardTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`;

/**
 * Card Content
 */
export const CardContent = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
`;

/**
 * Card Footer
 */
export const CardFooter = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.md};
  padding-top: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.border.subtle};
`;
