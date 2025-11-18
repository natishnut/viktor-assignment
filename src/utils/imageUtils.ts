import type { Author, BlogPost } from '@/types';

export function getAvatarUrl(avatar?: Author['avatar']) {
  if (!avatar) return undefined;
  return avatar.formats?.thumbnail?.url || avatar.formats?.small?.url || avatar.url;
}

export function getBlogImage(post: BlogPost) {
  const url = post.featured_image?.url || post.cover?.url;
  const alt = post.featured_image?.alternativeText || post.cover?.alternativeText || post.title;
  return { 
    url, 
    alt: alt || post.title 
  };
}

export function handleImageError(e: React.SyntheticEvent<HTMLImageElement, Event>) {
  const img = e.target as HTMLImageElement;
  img.style.display = 'none';
}
