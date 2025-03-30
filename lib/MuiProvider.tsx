import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@/style/theme';

const MuiProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppRouterCacheProvider>
      <CssBaseline />
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </AppRouterCacheProvider>
  );
};

export default MuiProvider;
