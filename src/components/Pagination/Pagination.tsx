import { Box, Pagination as MuiPagination, Typography } from '@mui/material';
import { VIKTOR_COLORS } from '@/config/theme';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between',
        alignItems: 'center',
        mt: 8,
        gap: 3,
      }}
    >
      <Typography
        variant="caption"
        sx={{
          fontSize: '14px',
          color: VIKTOR_COLORS.metaText,
        }}
      >
        Showing {startItem}-{endItem} of {totalItems} posts
      </Typography>
      <MuiPagination
        count={totalPages}
        page={currentPage}
        onChange={(_, page) => onPageChange(page)}
        sx={{
          '& .MuiPaginationItem-root': {
            color: VIKTOR_COLORS.darkGray,
            '&.Mui-selected': {
              backgroundColor: VIKTOR_COLORS.accentPink,
              color: VIKTOR_COLORS.white,
              '&:hover': {
                backgroundColor: VIKTOR_COLORS.accentPinkHover,
              },
            },
            '&:hover': {
              backgroundColor: VIKTOR_COLORS.lightGray,
            },
          },
        }}
        showFirstButton
        showLastButton
      />
    </Box>
  );
}
