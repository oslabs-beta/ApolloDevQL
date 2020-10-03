import React, {useState} from 'react';
import {ThemeProvider} from '@material-ui/core/styles';

import {Apollo11ThemeContextType} from '../../utils/managedlog/lib/eventLogNode';
import getTheme from './base';

export const Apollo11ThemeContext = React.createContext<
  Apollo11ThemeContextType | undefined
>(undefined);

type Props = {
  children: React.ReactNode;
};

const Apollo11ThemeProvider = ({children}: Props) => {
  let theme;
  let isDark;
  // State to hold the selected theme name
  const [themeName, _setThemeName] = useState(() => {
    // Read current theme from localStorage or maybe from an api
    const currentTheme = localStorage.getItem('apollo11AppTheme') || 'normal';
    // Retrieve the theme object of theme name from localStorage once context is rendered

    theme = getTheme(currentTheme);
    isDark = Boolean(currentTheme === 'dark');
    return currentTheme;
  });

  // Retrieve the theme object by theme name as safety check
  theme = getTheme(themeName || 'normal');
  isDark = Boolean(themeName === 'dark');
  // Wrap _setThemeName to store new theme names in localStorage
  const setThemeName = themeName => {
    localStorage.setItem('apollo11AppTheme', themeName);
    _setThemeName(themeName);
  };

  const themeContext = {
    currentTheme: themeName,
    setTheme: setThemeName,
    isDark,
  };

  return (
    <Apollo11ThemeContext.Provider value={themeContext}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </Apollo11ThemeContext.Provider>
  );
};

export default Apollo11ThemeProvider;
