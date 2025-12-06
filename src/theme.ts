import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#8B2EA6' }, // deep purple
    secondary: { main: '#2EA6A6' }, // teal/green
    background: { default: '#0b0810', paper: '#0f0c14' },
    text: { primary: '#E6E6FA', secondary: '#A8DADC' },
  },
  typography: {
    fontFamily: ['"Roboto"', '"Fira Mono"', 'monospace'].join(','),
    h4: { fontWeight: 700 },
    body1: { fontFamily: 'Fira Mono, monospace' },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: { borderRadius: 12, padding: 16 },
      },
    },
  },
});

export default theme;
