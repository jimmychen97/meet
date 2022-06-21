import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations } from './api';
import './nprogress.css';
import { mockData } from './mock-data';

class App extends Component {
  state = {
    events: mockData,
    locations: [],
    numberOfEvents: 32,
    currentLocation: 'all',
  };

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ events, locations: extractLocations(events) });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  updateNumberOfEvents = async (eventNumbers) => {
    await this.setState(
      {
        numberOfEvents: eventNumbers,
      },
      this.updateEvents(this.state.currentLocation, eventNumbers)
    );
  };

  updateEvents = (location, eventCount) => {
    console.log(eventCount);
    getEvents().then((events) => {
      const locationEvents =
        location === 'all'
          ? events
          : events.filter((event) => event.location === location);

      const evts = locationEvents.slice(0, eventCount);
      if (this.mounted) {
        this.setState({
          events: evts,
          currentLocation: location,
          numberOfEvents: eventCount,
        });
      }
    });
  };

  render() {
    return (
      <div className="App">
        <NumberOfEvents
          numberOfEvents={this.state.numberOfEvents}
          updateNumberOfEvents={this.updateNumberOfEvents}
        />
        <CitySearch
          locations={this.state.locations}
          updateEvents={this.updateEvents}
        />
        <EventList events={this.state.events} />
      </div>
    );
  }
}

export default App;
