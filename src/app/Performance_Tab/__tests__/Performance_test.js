// https://www.smashingmagazine.com/2020/06/practical-guide-testing-react-applications-jest/
import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// Project Files
import Performance from '../Performance_v2';
import mountWithTheme from '../../../../__mocks__/themeMock';
import Apollo11ThemeContext from '../../Panel/themes/ThemeProvider';
import fakeNetworkEvents from '../../../../__mocks__/fakeNetworkEvent';

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
  it('the first event should be named: GetLaunchList', () => {
    // Helpful Blog: https://medium.com/7shifts-engineering-blog/testing-usecontext-react-hook-with-enzyme-shallow-da062140fc83

    const wrapper = mountWithTheme(
      <Performance networkEvents={fakeNetworkEvents} />,
    );

    const eventListElement = wrapper
      .find({
        className:
          'MuiTypography-root MuiListItemText-primary MuiTypography-body2 MuiTypography-displayBlock',
      })
      .first()
      .find('span')
      .text();

    expect(eventListElement).toContain('GetLaunchList');
  });

  it('the first event should have speed of 269 ms', () => {
    const wrapper = mountWithTheme(
      <Performance networkEvents={fakeNetworkEvents} />,
    );

    const eventListElement = wrapper
      .find({
        className:
          'MuiTypography-root MuiListItemText-primary MuiTypography-body2 MuiTypography-displayBlock',
      })
      .first()
      .find('span')
      .text();

    expect(eventListElement).toContain('269 ms');
  });

  it('there should be 6 events + spinner', () => {
    const wrapper = mountWithTheme(
      <Performance networkEvents={fakeNetworkEvents} />,
    );

    const eventListElement = wrapper.find({
      className:
        'MuiTypography-root MuiListItemText-primary MuiTypography-body2 MuiTypography-displayBlock',
    });

    expect(eventListElement).toHaveLength(7);
  });
});
