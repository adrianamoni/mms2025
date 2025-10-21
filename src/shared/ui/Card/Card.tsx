import type { FC, HTMLAttributes } from 'react';
import * as S from './Card.styles';

export type CardProps = HTMLAttributes<HTMLElement> & S.CardProps;

type CardComponent = FC<CardProps> & {
  Header: typeof S.CardHeader;
  Title: typeof S.CardTitle;
  Content: typeof S.CardContent;
  Footer: typeof S.CardFooter;
};

/**
 * Card Component
 * Container component for grouping related content
 */
export const Card: CardComponent = Object.assign(
  (({ 
    children, 
    variant = 'default',
    padding = 'md',
    hoverable = false,
    clickable = false,
    ...props 
  }: CardProps) => {
    return (
      <S.Card
        variant={variant}
        padding={padding}
        hoverable={hoverable}
        clickable={clickable}
        {...props}
      >
        {children}
      </S.Card>
    );
  }) as FC<CardProps>,
  {
    Header: S.CardHeader,
    Title: S.CardTitle,
    Content: S.CardContent,
    Footer: S.CardFooter,
  }
);
