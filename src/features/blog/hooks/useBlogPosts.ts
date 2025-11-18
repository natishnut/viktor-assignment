import { useState, useEffect, useCallback } from 'react';
import { blogPostsApi } from '@/services';
import type { BlogPost, BlogPostsFilters } from '@/types';

export function useBlogPosts(filters: BlogPostsFilters = {}) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await blogPostsApi.getBlogPosts(filters);
      setPosts(data || []);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch blog posts'));
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return {
    posts,
    loading,
    error,
    refetch: fetchPosts,
  };
}

