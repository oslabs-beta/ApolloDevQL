import React, {useState} from 'react';
import {ThemeProvider} from '@material-ui/core/styles';
import getTheme from './base';

type ThemeContextType = {
  currentTheme: string;
  setTheme: (value: string) => void;
};
export const CustomThemeContext = React.createContext<
  ThemeContextType | undefined
>(undefined);

type Props = {
  children: React.ReactNode;
};

const CustomThemeProvider = ({children}: Props) => {
  let theme;
  // State to hold the selected theme name
  const [themeName, _setThemeName] = useState(() => {
    // Read current theme from localStorage or maybe from an api
    const currentTheme = localStorage.getItem('apollo11AppTheme') || 'normal';
    // Retrieve the theme object of theme name from localStorage
    theme = getTheme(currentTheme);
    return currentTheme;
  });

  // Retrieve the theme object by theme name
  theme = getTheme(themeName || 'normal');

  // Wrap _setThemeName to store new theme names in localStorage
  const setThemeName = name => {
    localStorage.setItem('apollo11AppTheme', name);
    _setThemeName(name);
  };

  const contextValue = {
    currentTheme: themeName,
    setTheme: setThemeName,
  };

  return (
    <CustomThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CustomThemeContext.Provider>
  );
};

export default CustomThemeProvider;
