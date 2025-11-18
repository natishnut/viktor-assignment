import { create } from 'zustand';

interface BlogState {
  selectedCategory: number | undefined;
  searchQuery: string;
  page: number;
  setSelectedCategory: (categoryId: number | undefined) => void;
  setSearchQuery: (query: string) => void;
  setPage: (page: number) => void;
  resetFilters: () => void;
}

export const useBlogStore = create<BlogState>((set) => ({
  selectedCategory: undefined,
  searchQuery: '',
  page: 1,
  setSelectedCategory: (categoryId) => {
    set({ selectedCategory: categoryId, page: 1 });
  },
  setSearchQuery: (query) => {
    set({ searchQuery: query, page: 1 });
  },
  setPage: (page) => {
    set({ page });
  },
  resetFilters: () => {
    set({ selectedCategory: undefined, searchQuery: '', page: 1 });
  },
}));

