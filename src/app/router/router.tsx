import { createBrowserRouter, Navigate } from 'react-router-dom';
import { IssuesListPage } from '@/pages/issues-list/IssuesListPage';
import { IssueDetailPage } from '@/pages/issue-detail/IssueDetailPage';
import { NotFoundPage } from '@/pages/not-found/NotFoundPage';

/**
 * Application routes configuration
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <IssuesListPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/issues',
    element: <Navigate to="/" replace />,
  },
  {
    path: '/issues/:issueNumber',
    element: <IssueDetailPage />,
  },
  {
    path: '/404',
    element: <NotFoundPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);