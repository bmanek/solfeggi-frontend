import React, { Component } from 'react'

export default class GameSettings extends Component {;

  constructor() {
    super()
    this.state = {
      game_type: "",
      active_tones: [],
      active_intervals: []
    }
  }

  handleGameType(event) {
    this.setState({ game_type: event.target.value })
  }

  render() {
    return(
      <React.Fragment>
        <h1>THIS IS THE GAME-SETTINGS COMPONENT</h1>
        <select value={this.state.game_type} onChange={(event) => this.handleGameType(event)}>
          <option></option>
          <option value="Tone">Tone</option>
          <option value="Interval">Interval</option>
        </select>
        {(this.state.game_type === "") ? console.log("Please select a game type!") : console.log("Well, okay!")}
      </React.Fragment>

    )
  }

}

// From Hogwarts//App.js
    // class App extends Component {
    //   state = {
    //     greased: false,
    //     sortBy: "",
    //     banished: [],
    //     showBanished: false
    //   };
    //
    //   handleSelectChange = e => {
    //   this.setState({ sortBy: e.target.value });
    // };





// From Hogwarts//Filter.js
    // <select
    //   className="ui selection dropdown"
    //   name="sort"
    //   onChange={handleSelectChange}
    //   value={sortBy}>
    //   <option value="name">Name</option>
    //   <option value="weight">Weight</option>
    // </select>




// attached game_type selector. No logic currently in place.
