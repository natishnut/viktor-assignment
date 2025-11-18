export const BLOG_CONFIG = {
  PAGE_SIZE: 8,
  MAX_EXCERPT_LINES: 3,
  MAX_TITLE_LINES: 2,
  MAX_EXCERPT_LINES_CARD: 3,
  MAX_TITLE_LINES_CARD: 2,
} as const;

export const LAYOUT_CONFIG = {
  SIDEBAR_WIDTH: 280,
  SIDEBAR_WIDTH_MOBILE: 280,
} as const;

export const UI_TEXT = {
  BLOG_TITLE: 'VIKTOR Blog',
  BLOG_DESCRIPTION: 'Get the latest updates on news and announcements, technical solutions and background articles.',
  LATEST: 'Latest',
  SEARCH_PLACEHOLDER: 'Search posts...',
  NO_POSTS_TITLE: 'No blog posts found',
  NO_POSTS_MESSAGE: 'Try adjusting your filters or search query',
  LOADING_POSTS: 'Loading blog posts...',
  FAILED_LOAD_TITLE: 'Failed to load blog posts',
  RETRY: 'Retry',
  ERROR_TITLE: 'Error',
  SOMETHING_WENT_WRONG: 'Something went wrong',
  UNEXPECTED_ERROR: 'An unexpected error occurred',
  TRY_AGAIN: 'Try again',
  LOADING: 'Loading...',
  FAILED_LOAD_CATEGORIES: 'Failed to load categories',
} as const;

