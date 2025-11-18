import { Alert, AlertTitle, Button, Box } from '@mui/material';
import { Refresh } from '@mui/icons-material';
import { VIKTOR_COLORS } from '@/config/theme';
import { UI_TEXT } from '@/config/constants';

interface ErrorMessageProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export function ErrorMessage({ title = UI_TEXT.ERROR_TITLE, message, onRetry }: ErrorMessageProps) {
  return (
    <Box sx={{ my: 4 }}>
      <Alert
        severity="error"
        action={
          onRetry && (
            <Button
              color="inherit"
              size="small"
              onClick={onRetry}
              startIcon={<Refresh />}
              sx={{
                color: VIKTOR_COLORS.black,
                '&:hover': {
                  backgroundColor: 'transparent',
                  textDecoration: 'underline',
                },
              }}
            >
              {UI_TEXT.RETRY}
            </Button>
          )
        }
        sx={{
          backgroundColor: VIKTOR_COLORS.lightGray,
          color: VIKTOR_COLORS.black,
          '& .MuiAlert-icon': {
            color: VIKTOR_COLORS.accentPink,
          },
        }}
      >
        <AlertTitle
          sx={{
            fontWeight: 600,
            color: VIKTOR_COLORS.black,
          }}
        >
          {title}
        </AlertTitle>
        {message}
      </Alert>
    </Box>
  );
}
