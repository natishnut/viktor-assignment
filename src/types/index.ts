export interface BlogPost {
  id: number;
  title: string;
  content?: string;
  excerpt?: string;
  publication_date: string;
  author?: Author;
  blogpost_categories?: BlogCategory[];
  cover?: {
    id?: number;
    url: string;
    alternativeText?: string;
    formats?: {
      thumbnail?: { url: string };
      small?: { url: string };
      medium?: { url: string };
      large?: { url: string };
    };
  };
  featured_image?: {
    url: string;
    alternativeText?: string;
  };
}

export interface Author {
  id: number;
  full_name: string;
  name?: string;
  email?: string;
  avatar?: {
    id?: number;
    url: string;
    formats?: {
      thumbnail?: { url: string };
      small?: { url: string };
      medium?: { url: string };
      large?: { url: string };
    };
  };
}

export interface BlogCategory {
  id: number;
  name: string;
  slug?: string;
}

export interface BlogPostsCountResponse {
  count: number;
}

export interface BlogPostsFilters {
  _start?: number;
  _limit?: number;
  _sort?: string;
  'blogpost_categories.id'?: number;
  'author.id'?: number;
  title_contains?: string;
}

