import { useMemo } from 'react';
import { Container, Box, Typography, Grid } from '@mui/material';
import { useBlogPosts } from '@/features/blog/hooks/useBlogPosts';
import { useBlogPostsCount } from '@/features/blog/hooks/useBlogPostsCount';
import { BlogCard } from '@/features/blog/components/BlogCard';
import { BlogCardGrid } from '@/features/blog/components/BlogCardGrid';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorMessage } from '@/components/ErrorMessage';
import { Pagination } from '@/components/Pagination';
import { getPaginationParams, getTotalPages, validatePage } from '@/utils/pagination';
import { VIKTOR_COLORS } from '@/config/theme';
import { BLOG_CONFIG, UI_TEXT } from '@/config/constants';
import { useBlogStore } from '@/store';

export function BlogListPage() {
  const { selectedCategory, searchQuery, page, setPage } = useBlogStore();

  const { count, loading: countLoading } = useBlogPostsCount();

  const filters = useMemo(() => {
    const pagination = getPaginationParams(page, BLOG_CONFIG.PAGE_SIZE);
    return {
      ...pagination,
      _sort: 'publication_date:DESC',
      ...(selectedCategory !== undefined && { 'blogpost_categories.id': selectedCategory }),
      ...(searchQuery.trim() && { title_contains: searchQuery.trim() }),
    };
  }, [page, selectedCategory, searchQuery]);

  const { posts, loading: postsLoading, error: postsError, refetch } = useBlogPosts(filters);

  const handlePageChange = (newPage: number) => {
    const totalPages = getTotalPages(count, BLOG_CONFIG.PAGE_SIZE);
    const validPage = validatePage(newPage, totalPages);
    setPage(validPage);
  };

  const loading = postsLoading || countLoading;
  const totalPages = getTotalPages(count, BLOG_CONFIG.PAGE_SIZE);

  const firstPost = posts[0] || null;
  const remainingPosts = posts.slice(1);

  return (
    <Box sx={{ backgroundColor: VIKTOR_COLORS.white, minHeight: '100vh' }}>
      <Container
        maxWidth="lg"
        sx={{
          py: { xs: 4, md: 6 },
          px: { xs: 2.5, md: 3 },
        }}
      >
        {postsError && (
          <ErrorMessage
            title={UI_TEXT.FAILED_LOAD_TITLE}
            message={postsError.message}
            onRetry={refetch}
          />
        )}

        {loading && !postsError ? (
          <LoadingSpinner message={UI_TEXT.LOADING_POSTS} />
        ) : (
          <>
            {posts.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 12 }}>
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: { xs: '24px', md: '32px' },
                    fontWeight: 600,
                    color: VIKTOR_COLORS.black,
                    mb: 2,
                  }}
                >
                  {UI_TEXT.NO_POSTS_TITLE}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: '18px',
                    color: VIKTOR_COLORS.metaText,
                  }}
                >
                  {UI_TEXT.NO_POSTS_MESSAGE}
                </Typography>
              </Box>
            ) : (
              <>
                {firstPost && (
                  <Box sx={{ mb: 6 }}>
                    <BlogCard post={firstPost} />
                  </Box>
                )}

                {remainingPosts.length > 0 && (
                  <Grid 
                    container 
                    spacing={3}
                    sx={{ mb: 6 }}
                  >
                    {remainingPosts.map((post) => (
                      <Grid item xs={12} sm={6} md={3} key={post.id}>
                        <BlogCardGrid post={post} />
                      </Grid>
                    ))}
                  </Grid>
                )}

                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  totalItems={count}
                  pageSize={BLOG_CONFIG.PAGE_SIZE}
                  onPageChange={handlePageChange}
                />
              </>
            )}
          </>
        )}
      </Container>
    </Box>
  );
}
