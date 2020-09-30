import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import Apollo11ThemeProvider from './themes/ThemeProvider';

ReactDOM.render(
  <Apollo11ThemeProvider>
    <App />
  </Apollo11ThemeProvider>,
  document.getElementById('root'),
);
