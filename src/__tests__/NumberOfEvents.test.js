import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents />);
  });

  test('render text input box', () => {
    expect(NumberOfEventsWrapper.find('.NumberOfEvents')).toHaveLength(1);
  });

  test('change number of events when input changes', () => {
    NumberOfEventsWrapper.setState({ numberOfEvents: 32 });
    expect(NumberOfEventsWrapper.state('numberOfEvents')).toEqual(32);
  });
});
