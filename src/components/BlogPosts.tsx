import { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Avatar,
  Box,
  CircularProgress,
  Alert,
  Chip,
} from '@mui/material';
import type { BlogPost } from '../types/BlogPost';

const API_URL = 'https://cms.viktor.ai/blogposts';

export default function BlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(API_URL);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch blog posts: ${response.statusText}`);
        }
        
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getImageUrl = (post: BlogPost) => {
    if (!post.cover) {
      return null;
    }
    
    if (post.cover.formats) {
      if (post.cover.formats.medium?.url) {
        return `https://cms.viktor.ai${post.cover.formats.medium.url}`;
      }
      if (post.cover.formats.small?.url) {
        return `https://cms.viktor.ai${post.cover.formats.small.url}`;
      }
      if (post.cover.formats.thumbnail?.url) {
        return `https://cms.viktor.ai${post.cover.formats.thumbnail.url}`;
      }
    }
    
    if (post.cover.url) {
      return `https://cms.viktor.ai${post.cover.url}`;
    }
    
    return null;
  };

  const getAuthorAvatarUrl = (post: BlogPost) => {
    if (!post.author?.avatar) {
      return null;
    }
    
    if (post.author.avatar.formats?.thumbnail?.url) {
      return `https://cms.viktor.ai${post.author.avatar.formats.thumbnail.url}`;
    }
    
    if (post.author.avatar.url) {
      return `https://cms.viktor.ai${post.author.avatar.url}`;
    }
    
    return null;
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (posts.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Blog Posts
        </Typography>
        <Typography variant="body1" align="center" sx={{ mt: 2 }}>
          No blog posts found.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
        Blog Posts
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          },
          gap: 3,
        }}
      >
        {posts.map((post) => {
          const imageUrl = getImageUrl(post);
          const avatarUrl = getAuthorAvatarUrl(post);

          return (
            <Card key={post.id} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              {imageUrl && (
                <CardMedia
                  component="img"
                  height="200"
                  image={imageUrl}
                  alt={post.title}
                />
              )}
              <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6" component="h2" gutterBottom>
                  {post.title}
                </Typography>
                {post.excerpt && (
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
                    {post.excerpt}
                  </Typography>
                )}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto', pt: 2 }}>
                  {post.author && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {avatarUrl && (
                        <Avatar src={avatarUrl} alt={post.author.full_name} sx={{ width: 32, height: 32 }} />
                      )}
                      <Typography variant="caption" color="text.secondary">
                        {post.author.full_name}
                      </Typography>
                    </Box>
                  )}
                  {post.published_at && (
                    <Chip
                      label={formatDate(post.published_at)}
                      size="small"
                      variant="outlined"
                    />
                  )}
                </Box>
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </Container>
  );
}

