// https://www.smashingmagazine.com/2020/06/practical-guide-testing-react-applications-jest/
import React from 'react';
import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Performance from '../Performance_v2';
import mountWithTheme from '../../../../__mocks__/themeMock';

import fakeNetworkEvents from '../../../../__mocks__/fakeNetworkEvent';

console.log('networkEvents in tests', fakeNetworkEvents);

configure({
  adapter: new Adapter(),
});

describe('snapshot tests', () => {
  const networkEvents = {};
  let wrapper;

  it('should mount the app', () => {
    wrapper = mountWithTheme(<Performance networkEvents={networkEvents} />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('Events Log', () => {
  expect(1).toEqual(1);
});
