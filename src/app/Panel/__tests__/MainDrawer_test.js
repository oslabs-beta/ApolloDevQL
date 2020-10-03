/* eslint-disable react/display-name */
import React from 'react';
import {shallow, mount, render, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import MainDrawer from '../MainDrawer';
import data from '../../../../__mocks__/schema';
import mountWithTheme from '../../../../__mocks__/themeMock';

document.createRange = () => {
  const range = new Range();

  range.getBoundingClientRect = jest.fn();

  range.getClientRects = jest.fn(() => ({
    item: () => null,
    length: 0,
  }));

  return range;
};

configure({
  adapter: new Adapter(),
});

describe('snapshot tests', () => {
  const endpointURI = {};
  const events = {};
  const networkEvents = {};
  const networkURI = {};

  let wrapper;

  it('should mount the app', () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => ({
          data,
        }),
      }),
    );
    wrapper = mountWithTheme(
      <MainDrawer
        endpointURI={endpointURI}
        events={events}
        networkEvents={networkEvents}
        networkURI={networkURI}
      />,
    );

    // console.log('wrapper :>> ', wrapper.html());
    // console.log('wrapper :>> ', wrapper.text());
    expect(wrapper).toMatchSnapshot();
  });
});
