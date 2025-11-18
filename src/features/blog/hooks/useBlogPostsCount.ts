import { useState, useEffect } from 'react';
import { blogPostsApi } from '@/services';

export function useBlogPostsCount() {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCount = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await blogPostsApi.getBlogPostsCount();
      setCount(res.count || 0);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch blog posts count'));
      setCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCount();
  }, []);

  return {
    count,
    loading,
    error,
    refetch: fetchCount,
  };
}

