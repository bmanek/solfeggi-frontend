import React, { Component } from 'react'
import Game from './Game'

export default class GameSettings extends Component {;

  constructor() {
    super()
    this.state = {
      game_type: "",
      active_tones: [440.00, 493.88, 523.25, 587.33],
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
          (this.state.game_type === "Tone") ?
          <Game options={this.state.active_tones} /> :
          <Game options={this.state.active_intervals} />
        }
      </React.Fragment>

    )
  }

}
