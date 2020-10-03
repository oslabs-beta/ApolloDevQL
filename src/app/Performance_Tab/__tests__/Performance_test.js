import React from 'react';
import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Performance from '../Performance';
import mountWithTheme from '../../../../__mocks__/themeMock';

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
