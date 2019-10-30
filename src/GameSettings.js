import React, { Component } from 'react'
import ToneGame from './ToneGame'

export default class GameSettings extends Component {;

  constructor() {
    super()
    this.state = {
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

  render() {
    return(
      <React.Fragment>
        <ToneGame
          all_tones={this.state.all_tones}
        />
      </React.Fragment>
    )
  }

}
