import { useState, useEffect, useCallback } from 'react';
import { categoriesApi } from '@/services';
import type { BlogCategory } from '@/types';

export function useCategories() {
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadCategories = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await categoriesApi.getCategories();
      setCategories(result || []);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch categories'));
      setCategories([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  return {
    categories,
    loading,
    error,
    refetch: loadCategories,
  };
}

