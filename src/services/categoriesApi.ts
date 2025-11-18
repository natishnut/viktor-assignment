import { fetchApi } from './apiClient';
import type { BlogCategory } from '@/types';

export const categoriesApi = {
  async getCategories(): Promise<BlogCategory[]> {
    return fetchApi<BlogCategory[]>('/blogpost-categories');
  },
};

