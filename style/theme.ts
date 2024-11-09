import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#68472b',
    },
    secondary: {
      main: '#825936',
    },
    success: {
      light: '#f4f5f1',
      main: '#cbcfc2',
      dark: '#5a653d',
    },
    info: {
      main: '#e5dcd4',
    },
    warning: {
      main: '#f4d35e',
    },
    error: {
      main: '#fff5f5', // Using $red-100 as $danger
    },
    grey: {
      50: '#f7f6f6', // lightest
      100: '#d9d9d9', // light
      200: '#aba7a4', // normal
      900: '#44413f', // dark
    },
  },
  breakpoints: {
    values: {
      mobile: 768,
      tablet: 1024,
      laptop: 1280,
      desktop: 1440,
    },
  },
});
