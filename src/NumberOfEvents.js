import React, { Component } from 'react';

class NumberOfEvents extends Component {
  constructor() {
    super();
    this.state = {
      numberOfEvents: 32,
    };
  }

  updateNumberOfEvents = (event) => {
    this.setState({
      numberOfEvents: event.target.value,
    });
    this.props.updateNumberOfEvents(event.target.value);
  };

  render() {
    return (
      <div className="NumberOfEvents">
        <label className="numbercount">Number of events</label>
        <input
          type="number"
          className="numberinput"
          onChange={this.updateNumberOfEvents}
          value={this.state.numberOfEvents}
        />
      </div>
    );
  }
}

export default NumberOfEvents;
