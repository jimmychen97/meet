import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents />);
  });

  test('render text input box', () => {
    expect(NumberOfEventsWrapper.find('.number-of-events')).toHaveLength(1);
  });

  test('renders text input changes', () => {
    const numberOfEvents = NumberOfEventsWrapper.prop('numberOfEvents');
    expect(NumberOfEventsWrapper.find('.number-of-events').prop('value')).toBe(
      numberOfEvents
    );
  });
});
