export interface BlogPostAuthor {
  id: number;
  full_name: string;
  created_at: string;
  updated_at: string;
  avatar?: {
    id: number;
    name: string;
    url: string;
    formats?: {
      thumbnail?: {
        url: string;
      };
    } | null;
  };
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  body?: string;
  intro?: string;
  author: BlogPostAuthor | null;
  slug: string;
  published_at: string;
  created_at: string;
  updated_at: string;
  cover?: {
    id: number;
    name: string;
    url: string;
    formats?: {
      thumbnail?: {
        url: string;
      };
      medium?: {
        url: string;
      };
      small?: {
        url: string;
      };
    } | null;
  } | null;
}

