'use client';

import { Provider as ReduxProvider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import store from '@/config/configureStore';
import { theme } from '@/style/theme';
import { CssBaseline } from '@mui/material';

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReduxProvider store={store}>
      <CssBaseline />
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ReduxProvider>
  );
};

export default Provider;
