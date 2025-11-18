import { Box, CardMedia } from '@mui/material';
import { VIKTOR_COLORS } from '@/config/theme';
import { getBlogImage, handleImageError } from '@/utils/imageUtils';
import type { BlogPost } from '@/types';

interface BlogImageProps {
  post: BlogPost;
  maxHeight?: string | number;
  aspectRatio?: string;
  objectFit?: 'cover' | 'contain' | 'fill';
}

export function BlogImage({ 
  post, 
  maxHeight,
  aspectRatio,
  objectFit = 'cover',
}: BlogImageProps) {
  const { url, alt } = getBlogImage(post);

  if (!url) {
    return null;
  }

  if (aspectRatio) {
    return (
      <Box
        sx={{
          width: '100%',
          paddingTop: aspectRatio,
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: VIKTOR_COLORS.lightGray,
        }}
      >
        <CardMedia
          component="img"
          image={url}
          alt={alt}
          loading="lazy"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit,
          }}
          onError={handleImageError}
        />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: '100%',
        maxHeight: maxHeight || '300px',
        overflow: 'hidden',
        backgroundColor: VIKTOR_COLORS.lightGray,
      }}
    >
      <CardMedia
        component="img"
        image={url}
        alt={alt}
        loading="lazy"
        sx={{
          width: '100%',
          height: 'auto',
          maxHeight: maxHeight || '300px',
          display: 'block',
          objectFit,
        }}
        onError={handleImageError}
      />
    </Box>
  );
}

