import React, { Component } from 'react'
import Game from './Game'

export default class GameSettings extends Component {;

  constructor() {
    super()
    this.state = {
      game_type: "",
      answer: "",
      active_tones: [
        {"tone": "A 4",
         "freq": 440.00},

        {"tone": "B 4",
         "freq": 493.88},
      ],
      active_intervals: [],
      all_tones: [
        {"tone": "A 3",
         "freq": 220.00},

        {"tone": "B 3",
         "freq": 246.94},

        {"tone": "C 4",
         "freq": 261.63},

        {"tone": "D 4",
         "freq": 293.66},

        {"tone": "E 4",
         "freq": 329.63},

        {"tone": "F 4",
         "freq": 349.23},

        {"tone": "G 4",
         "freq": 392.00},

        {"tone": "A 4",
         "freq": 440.00},

        {"tone": "B 4",
         "freq": 493.88},

        {"tone": "C 5",
         "freq": 523.25},

        {"tone": "D 5",
         "freq": 587.33},

        {"tone": "E 5",
         "freq": 659.25},

        {"tone": "F 5",
         "freq": 698.46},

        {"tone": "G 5",
         "freq": 783.99},

        {"tone": "A 5",
         "freq": 880.00},

        {"tone": "B 5",
         "freq": 987.77},

        {"tone": "C 6",
         "freq": 1046.50},

        {"tone": "D 6",
         "freq": 1174.66},

        {"tone": "E 6",
         "freq": 1318.51},

        {"tone": "F 6",
         "freq": 1396.91},

        {"tone": "G 6",
         "freq": 1567.98},

        {"tone": "A 6",
         "freq": 1760.00},

        {"tone": "B 6",
         "freq": 1975.53},

        {"tone": "C 7",
         "freq": 2093.00}
      ]
    }
  }

  handleGameType(event) {
    this.setState({ game_type: event.target.value })
  }

  handleAnswer = (tone) => {
    this.setState({
      answer: tone
    })
  }

  clearAnswer = () => {
    this.setState({
      answer: ""
    })
  }


  render() {
    return(
      <React.Fragment>
        <h1>THIS IS THE GAME-SETTINGS COMPONENT</h1>
        <select value={this.state.game_type} onChange={(event) => this.handleGameType(event)}>
          <option></option>
          <option value="Tone">Tone</option>
          <option value="Interval">Interval</option>
          <option value="Keyboard">Keyboard</option>
        </select>
        <br>
        </br>
        {(this.state.game_type === "") ? <p>Please select a game type!</p> :
          (this.state.game_type === "Tone") ?
          <Game clearAnswer={this.clearAnswer}
                game_type={this.state.game_type}
                options={this.state.active_tones}
                answer={this.state.answer}
                handleAnswer={this.handleAnswer}/>
           :
          (this.state.game_type === "Interval") ?
          <Game game_type={this.state.game_type}
                options={this.state.active_intervals} /> :
          (this.state.game_type === "Keyboard") ?
          <Game game_type={this.state.game_type}
                options={this.state.all_tones} /> : null
        }
      </React.Fragment>
    )
  }

}



// (this.state.all_tones.map((tone) => {
//   return(<button>{tone.tone}</button>)
// }))
