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
        {(this.state.game_type === "") ? console.log("Please select a game type!") :
          (this.state.game_type === "Tone") ? console.log("You've selected Tone!") : console.log("You've selected Interval!")
        }
      </React.Fragment>

    )
  }

}
