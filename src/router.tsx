import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { BlogListPage } from '@/features/blog/pages/BlogListPage';
import { Layout } from '@/layouts/Layout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <BlogListPage />,
      },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}

