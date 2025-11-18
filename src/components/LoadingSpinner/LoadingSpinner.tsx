import { Box, CircularProgress, Typography } from '@mui/material';
import { VIKTOR_COLORS } from '@/config/theme';
import { UI_TEXT } from '@/config/constants';

interface LoadingSpinnerProps {
  message?: string;
}

export function LoadingSpinner({ message = UI_TEXT.LOADING }: LoadingSpinnerProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '400px',
        gap: 3,
      }}
    >
      <CircularProgress
        sx={{
          color: VIKTOR_COLORS.accentPink,
        }}
      />
      {message && (
        <Typography
          variant="body1"
          sx={{
            fontSize: '18px',
            color: VIKTOR_COLORS.metaText,
          }}
        >
          {message}
        </Typography>
      )}
    </Box>
  );
}
