import React from 'react';
import {shallow, mount, render, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ApolloTab from '../ApolloTab';

configure({
  adapter: new Adapter(),
});

describe('test', () => {
  const testEvents = {};
  let wrapper;

  it('should render the app', () => {
    wrapper = shallow(<ApolloTab eventLog={testEvents} />);
    console.log('wrapper :>> ', wrapper);
  });
});
