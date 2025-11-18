import { fetchApi, buildQueryString } from './apiClient';
import { normalizeBlogPost } from './normalizers';
import type { BlogPost, BlogPostsCountResponse, BlogPostsFilters } from '@/types';

export const blogPostsApi = {
  async getBlogPosts(filters: BlogPostsFilters = {}): Promise<BlogPost[]> {
    const queryString = buildQueryString(filters);
    const endpoint = `/blogposts${queryString ? `?${queryString}` : ''}`;
    const posts = await fetchApi<BlogPost[]>(endpoint);
    return Array.isArray(posts) ? posts.map(normalizeBlogPost) : [];
  },

  async getBlogPostsCount(): Promise<BlogPostsCountResponse> {
    const response = await fetchApi<BlogPostsCountResponse | number>('/blogposts/count');
    if (typeof response === 'number') {
      return { count: response };
    }
    return response;
  },

  async getBlogPostById(id: number): Promise<BlogPost> {
    const post = await fetchApi<BlogPost>(`/blogposts/${id}`);
    return normalizeBlogPost(post);
  },
};

