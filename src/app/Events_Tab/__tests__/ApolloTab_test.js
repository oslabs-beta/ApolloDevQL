import React from 'react';
import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ApolloTabResponsive from '../ApolloTabResponsive';
import mountWithTheme from '../../../../__mocks__/themeMock';

configure({
  adapter: new Adapter(),
});

describe('snapshot tests', () => {
  const testEvents = {
    eventHead: null,
    eventLength: 0,
    eventTail: null,
  };
  let wrapper;

  it('should mount the app', () => {
    wrapper = mountWithTheme(<ApolloTabResponsive eventLog={testEvents} />);
    expect(wrapper).toMatchSnapshot();
  });
});
