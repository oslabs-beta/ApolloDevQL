import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import App from './app';
import CustomThemeProvider from './themes/CustomThemeProvider';

ReactDOM.render(
  <CustomThemeProvider>
    <CssBaseline />
    <App />
  </CustomThemeProvider>,
  document.getElementById('root'),
);
