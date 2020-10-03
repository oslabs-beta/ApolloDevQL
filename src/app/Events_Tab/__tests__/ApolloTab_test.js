import React from 'react';
import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ApolloTab from '../ApolloTab';
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
    wrapper = mountWithTheme(<ApolloTab eventLog={testEvents} />);
    expect(wrapper).toMatchSnapshot();
  });
});
