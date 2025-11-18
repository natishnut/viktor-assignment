import { Card, CardContent, Typography, Box } from '@mui/material';
import { formatDate } from '@/utils/date';
import { VIKTOR_COLORS } from '@/config/theme';
import { BlogImage } from '@/components/BlogImage';
import { AuthorAvatar } from '@/components/AuthorAvatar';
import { CategoryChips } from '@/components/CategoryChips';
import { BLOG_CONFIG } from '@/config/constants';
import type { BlogPost } from '@/types';

interface BlogCardGridProps {
  post: BlogPost;
  onClick?: () => void;
}

export function BlogCardGrid({ post, onClick }: BlogCardGridProps) {
  const { title, excerpt, publication_date, author, blogpost_categories } = post;

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
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
      <BlogImage post={post} aspectRatio="56.25%" />

      <CardContent
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          p: 2.5,
        }}
      >
        <Typography
          variant="caption"
          sx={{
            fontSize: '12px',
            color: VIKTOR_COLORS.metaText,
            display: 'block',
            mb: 1.5,
          }}
        >
          {formatDate(publication_date)}
        </Typography>

        <Typography
          variant="h4"
          component="h3"
          sx={{
            fontSize: '18px',
            fontWeight: 600,
            lineHeight: 1.3,
            color: VIKTOR_COLORS.black,
            mb: 1.5,
            display: '-webkit-box',
            WebkitLineClamp: BLOG_CONFIG.MAX_TITLE_LINES_CARD,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {title}
        </Typography>

        {excerpt && (
          <Typography
            variant="body2"
            sx={{
              fontSize: '14px',
              lineHeight: 1.5,
              color: VIKTOR_COLORS.darkGray,
              mb: 2,
              display: '-webkit-box',
              WebkitLineClamp: BLOG_CONFIG.MAX_EXCERPT_LINES_CARD,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              flexGrow: 1,
            }}
          >
            {excerpt}
          </Typography>
        )}

        {author && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
            <AuthorAvatar author={author} size={32} />
            <Typography
              variant="body2"
              sx={{
                fontSize: '14px',
                color: VIKTOR_COLORS.black,
                fontWeight: 500,
              }}
            >
              {author.name || author.full_name}
            </Typography>
          </Box>
        )}

        {blogpost_categories?.length > 0 && (
          <CategoryChips categories={blogpost_categories} />
        )}
      </CardContent>
    </Card>
  );
}
