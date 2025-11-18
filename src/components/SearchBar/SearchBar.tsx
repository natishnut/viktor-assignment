import { Box, TextField, InputAdornment } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { VIKTOR_COLORS } from '@/config/theme';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, onSubmit, placeholder = 'Search...' }: SearchBarProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit();
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
      <TextField
        fullWidth
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: VIKTOR_COLORS.metaText, fontSize: '20px' }} />
            </InputAdornment>
          ),
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            backgroundColor: VIKTOR_COLORS.white,
            fontSize: '14px',
            '& fieldset': {
              borderColor: VIKTOR_COLORS.lightGray,
            },
            '&:hover fieldset': {
              borderColor: VIKTOR_COLORS.darkGray,
            },
            '&.Mui-focused fieldset': {
              borderColor: VIKTOR_COLORS.black,
            },
          },
        }}
      />
    </Box>
  );
}

