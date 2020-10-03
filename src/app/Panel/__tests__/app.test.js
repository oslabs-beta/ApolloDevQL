import React from 'react';
import {
  shallow,
  mount,
  render,
  configure
} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import App from '../app';

configure({
  adapter: new Adapter(),
});

describe('test', () => {
  it('should render the app', () => {
    // shallow( < App / > );
  });
});