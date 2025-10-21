import React from 'react';
import { IssueDetail } from '@/features/issue-detail/components/IssueDetail';

/**
 * Issue Detail Page
 * Displays a single issue with its comments
 * Leverages React Query cache for optimal performance
 */
export const IssueDetailPage: React.FC = () => {
  return <IssueDetail />;
};