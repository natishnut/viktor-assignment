import { Card, CardContent, Typography, Box, Link } from '@mui/material';
import { formatDate } from '@/utils/date';
import { VIKTOR_COLORS } from '@/config/theme';
import { BlogImage } from '@/components/BlogImage';
import { AuthorAvatar } from '@/components/AuthorAvatar';
import { CategoryChips } from '@/components/CategoryChips';
import { BLOG_CONFIG } from '@/config/constants';
import type { BlogPost } from '@/types';

interface BlogCardProps {
  post: BlogPost;
  onClick?: () => void;
}

export function BlogCard({ post, onClick }: BlogCardProps) {
  const { title, excerpt, publication_date, author, blogpost_categories } = post;

  return (
    <Card
      sx={{
        cursor: onClick ? 'pointer' : 'default',
        backgroundColor: VIKTOR_COLORS.white,
        border: `1px solid ${VIKTOR_COLORS.lightGray}`,
        borderRadius: '8px',
        overflow: 'hidden',
        transition: 'box-shadow 0.2s ease',
        ...(onClick && {
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          },
        }),
      }}
      onClick={onClick}
      elevation={0}
    >
      <BlogImage post={post} maxHeight="300px" />

      <CardContent
        sx={{
          p: 2.5,
        }}
      >
        <Typography
          variant="caption"
          sx={{
            fontSize: '13px',
            color: VIKTOR_COLORS.metaText,
            display: 'block',
            mb: 1,
          }}
        >
          {formatDate(publication_date)}
        </Typography>

        {blogpost_categories?.length > 0 && (
          <Box sx={{ mb: 1.5 }}>
            <CategoryChips categories={blogpost_categories} />
          </Box>
        )}

        {author && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
            <AuthorAvatar author={author} size={32} />
            <Typography
              variant="body2"
              sx={{
                fontSize: '13px',
                color: VIKTOR_COLORS.metaText,
              }}
            >
              by {author.name || author.full_name}
            </Typography>
          </Box>
        )}

        <Typography
          variant="h3"
          component="h2"
          sx={{
            fontSize: { xs: '22px', md: '28px' },
            fontWeight: 600,
            lineHeight: 1.3,
            color: VIKTOR_COLORS.black,
            mb: 1.5,
            cursor: onClick ? 'pointer' : 'default',
            ...(onClick && {
              '&:hover': {
                color: VIKTOR_COLORS.accentPink,
              },
            }),
          }}
          onClick={onClick}
        >
          {title}
        </Typography>

        {excerpt && (
          <Typography
            variant="body1"
            sx={{
              fontSize: '15px',
              lineHeight: 1.5,
              color: VIKTOR_COLORS.darkGray,
              mb: 1.5,
              display: '-webkit-box',
              WebkitLineClamp: BLOG_CONFIG.MAX_EXCERPT_LINES,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {excerpt}
          </Typography>
        )}

        {onClick && (
          <Link
            component="button"
            onClick={onClick}
            sx={{
              fontSize: '13px',
              fontWeight: 500,
              color: VIKTOR_COLORS.accentPink,
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            Read more
          </Link>
        )}
      </CardContent>
    </Card>
  );
}
