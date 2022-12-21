import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ReactQueryDevtools } from 'react-query/devtools';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Container } from '@mui/material';

const queryClient = new QueryClient();

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <QueryClientProvider client={queryClient}>
        <CssBaseline />
        <Container 
          sx={{
            height: "100vh", 
            width: "100vw",
            overflowX: "hidden"
          }}
          >
          <App />
          <ReactQueryDevtools initialIsOpen={false} />
        </Container>
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>
);
