import { Box, Chip } from '@mui/material';
import { VIKTOR_COLORS } from '@/config/theme';
import type { BlogCategory } from '@/types';

interface CategoryChipsProps {
  categories: BlogCategory[];
  size?: 'small' | 'medium';
  variant?: 'outlined' | 'filled';
}

export function CategoryChips({ 
  categories, 
  size = 'small',
  variant = 'outlined',
}: CategoryChipsProps) {
  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
      {categories.map((category) => (
        <Chip
          key={category.id}
          label={category.name}
          size={size}
          variant={variant}
          sx={{
            fontSize: size === 'small' ? '11px' : '12px',
            height: size === 'small' ? '20px' : '24px',
            backgroundColor: variant === 'outlined' ? 'transparent' : undefined,
            border: variant === 'outlined' ? `1px solid ${VIKTOR_COLORS.lightGray}` : undefined,
            color: VIKTOR_COLORS.darkGray,
            '&:hover': variant === 'outlined' ? {
              borderColor: VIKTOR_COLORS.darkGray,
            } : {},
          }}
        />
      ))}
    </Box>
  );
}

