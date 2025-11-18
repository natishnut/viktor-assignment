import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { theme } from '@/config/theme';
import { AppRouter } from './router';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <AppRouter />
    </ThemeProvider>
  );
}

export default App;
