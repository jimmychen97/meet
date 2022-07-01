import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations } from './api';
import './nprogress.css';
import { mockData } from './mock-data';
import { OfflineAlert } from './Alert';

class App extends Component {
  state = {
    events: mockData,
    locations: [],
    numberOfEvents: 32,
    currentLocation: 'all',
    offlineText: '',
  };

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ events, locations: extractLocations(events) });
      }
    });

    if (!navigator.onLine) {
      this.setState({
        offlineText: "Your're offline",
      });
    } else {
      this.setState({
        offlineText: '',
      });
    }
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
        <OfflineAlert text={OfflineAlertText} />
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
