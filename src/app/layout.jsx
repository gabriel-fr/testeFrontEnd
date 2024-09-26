'use client';
import { GlobalStyles, ThemeProvider, createTheme } from '@mui/material';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'primereact/resources/themes/lara-light-cyan/theme.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#00c1b4',
    },
    secondary: {
      main: '#0170a5',
    },
    background: {
      default: '#f9f9f9',
      paper: '#ffffff',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '15px',
        },
        contained: {
          color: '#fff',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff',
        },
      },
    },
  },
});

export default function RootLayout({ children }) {
  return (
    <html lang="pt" dir="ltr">
      <head>
        <title>Delta Global</title>
      </head>
      <body>
        <ThemeProvider theme={theme}>
          <ToastContainer />
          <GlobalStyles
            styles={{
              '*': { margin: 0, padding: 0, boxSizing: 'border-box' },
            }}
          />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
