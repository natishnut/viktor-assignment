import { API_BASE_URL } from '@/config/api';
import type { Author, BlogPost } from '@/types';

export function ensureAbsoluteUrl(url: string) {
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  if (url.startsWith('/')) {
    return `${API_BASE_URL}${url}`;
  }
  return `${API_BASE_URL}/${url}`;
}

function normalizeFormat(format: { url: string } | undefined) {
  if (!format) return undefined;
  return { ...format, url: ensureAbsoluteUrl(format.url) };
}

function normalizeFormats(formats: { thumbnail?: { url: string }; small?: { url: string }; medium?: { url: string }; large?: { url: string } } | undefined) {
  if (!formats) return undefined;
  return {
    ...formats,
    thumbnail: normalizeFormat(formats.thumbnail),
    small: normalizeFormat(formats.small),
    medium: normalizeFormat(formats.medium),
    large: normalizeFormat(formats.large),
  };
}

export function normalizeAuthor(author: Author) {
  if (!author.name) {
    author.name = author.full_name;
  }
  return author;
}

export function normalizeBlogPost(post: BlogPost) {
  const result = { ...post };

  if (post.cover?.url) {
    result.cover = {
      ...post.cover,
      url: ensureAbsoluteUrl(post.cover.url),
      formats: normalizeFormats(post.cover.formats),
    };
  }

  if (result.cover && !result.featured_image) {
    result.featured_image = {
      url: result.cover.url,
      alternativeText: result.cover.alternativeText,
    };
  }

  if (post.author) {
    result.author = normalizeAuthor(post.author);
    if (result.author.avatar?.url) {
      result.author.avatar = {
        ...result.author.avatar,
        url: ensureAbsoluteUrl(result.author.avatar.url),
        formats: {
          thumbnail: normalizeFormat(result.author.avatar.formats?.thumbnail),
          small: normalizeFormat(result.author.avatar.formats?.small),
        },
      };
    }
  }

  return result;
}

