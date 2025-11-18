import { fetchApi } from './apiClient';
import type { Author } from '@/types';

export const authorsApi = {
  async getAuthors(): Promise<Author[]> {
    const authors = await fetchApi<Author[]>('/authors');
    if (!Array.isArray(authors)) {
      return [];
    }
    
    return authors.map(author => ({
      ...author,
      name: author.full_name || author.name,
    }));
  },
};

