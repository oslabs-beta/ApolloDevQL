import React from 'react';
import {shallow, mount, render, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {chrome} from 'jest-chrome';
import App from '../app';
import mountWithTheme from '../../../../__mocks__/themeMock';

configure({
  adapter: new Adapter(),
});

describe('snapshot tests', () => {
  let wrapper;

  // it('should shallow render the app', () => {
  //   wrapper = shallow(<App />);
  //   console.log('wrapper :>> ', wrapper.html());
  //   console.log('wrapper :>> ', wrapper.text());
  // });
  it('should mount the app', () => {
    wrapper = mountWithTheme(<App />);
    // console.log('wrapper :>> ', wrapper.html());
    // console.log('wrapper :>> ', wrapper.text());
    expect(wrapper).toMatchSnapshot();
  });
  // it('should static render the app', () => {
  //   wrapper = render(<App />);
  //   console.log('wrapper :>> ', wrapper.html());
  //   console.log('wrapper :>> ', wrapper.text());
  // });
});
