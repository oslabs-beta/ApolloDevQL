import React from 'react';
import {mount} from 'enzyme';

import Apollo11ThemeProvider from '../src/app/Panel/themes/ThemeProvider';
import normal from '../src/app/Panel/themes/normal';

/*
import { ThemeProvider } from "styled-components";
import { yourTheme } from "path-to-your-theme";

const getThemeProviderWrappingComponent = theme => ({ children }) => (
  <Apollo11ThemeProvider theme={normal}>{children}</Apollo11ThemeProvider>
);

export const shallowWithTheme = (tree: React.Node, theme: Object = normal) => {
  return shallow(tree, {
    wrappingComponent: getThemeProviderWrappingComponent(theme)
  })
    .dive()
    .dive();
};

export const mountWithTheme = (component: React.Node, theme: Object = normal) => {
  const wrapper = mount(component, {
    wrappingComponent: getThemeProviderWrappingComponent(theme)
  });

  return wrapper;
};

*/

const getThemeProviderWrappingComponent = () => ({children}) => (
  <Apollo11ThemeProvider theme={normal}> {children} </Apollo11ThemeProvider>
);

const mountWithTheme = (component, theme = normal) => {
  const wrapper = mount(component, {
    wrappingComponent: getThemeProviderWrappingComponent(theme),
  });

  return wrapper;
};

export default mountWithTheme;
