import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material';
import './index.scss';
import { App } from './App';
import store from './app/store';

const theme = createTheme({
  palette: {
    primary: {
      main: '#9A1750',
    },
    secondary: {
      main: '#E3AFBC',
    },
  },
});

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root'),
);
