import React, { Component } from 'react'
import IntervalGame from './IntervalGame'
import ToneGame from './ToneGame'
import Keyboard from './Keyboard'

export default class GameSettings extends Component {;

  constructor() {
    super()
    this.state = {
      game_type: "",
      answer_pitch: "",
      answer_freq: 0,
      active_tones: [
        {"tone": "A 4",
         "freq": 440.00},

        {"tone": "B 4",
         "freq": 493.88},

        {"tone": "C 5",
         "freq": 523.25},

        {"tone": "D 5",
         "freq": 587.33},

        {"tone": "E 5",
         "freq": 659.25}
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
      ],


      keyboard_tones: [
        {"tone": "C 4",
         "freq": 261.63},

         {"tone": "C# 4",
          "freq": 277.18},

        {"tone": "D 4",
         "freq": 293.66},

         {"tone": "D# 4",
          "freq": 311.13},

        {"tone": "E 4",
         "freq": 329.63},

        {"tone": "F 4",
         "freq": 349.23},

         {"tone": "F# 4",
          "freq": 369.99},

        {"tone": "G 4",
         "freq": 392.00},

         {"tone": "G# 4",
          "freq": 415.30},

        {"tone": "A 4",
         "freq": 440.00},

         {"tone": "A# 4",
          "freq": 466.16},

        {"tone": "B 4",
         "freq": 493.88},

        {"tone": "C 5",
         "freq": 523.25},

         {"tone": "C# 5",
          "freq": 554.37},

        {"tone": "D 5",
         "freq": 587.33},

         {"tone": "D# 5",
          "freq": 622.25},

        {"tone": "E 5",
         "freq": 659.25},

        {"tone": "F 5",
         "freq": 698.46},

         {"tone": "F# 5",
          "freq": 739.99},

        {"tone": "G 5",
         "freq": 783.99},

         {"tone": "G# 5",
          "freq": 830.61},

        {"tone": "A 5",
         "freq": 880.00},

         {"tone": "A# 5",
          "freq": 932.33},

        {"tone": "B 5",
         "freq": 987.77},

        {"tone": "C 6",
         "freq": 1046.50}
      ]
    }
  }

  handleToneSelection = (event) => {
    let selectedTone = this.state.all_tones.find(tone => tone.tone === event.target.innerText)
    let copy = [...this.state.active_tones]
    let filteredArray = copy.filter(tone => tone.tone !== selectedTone.tone)
    if (this.state.active_tones.find(tone => tone.tone ===
      event.target.innerText)) {
      this.setState({
        active_tones: [...filteredArray]
      })
    } else {
        this.setState({
          active_tones: [...this.state.active_tones, selectedTone]
        })
      }
  }

  handleReset = () => {
    this.setState({
      answer_freq: 0,
      answer_pitch: "",

    })
  }

  handleGameType(event) {
    this.setState({ game_type: event.target.value })
  }

  handleAnswerPitch = (tone) => {
    this.setState({
      answer_pitch: tone
    })
  }

  handleAnswerFreq = (freq) => {
    this.setState({
      answer_freq: freq
    })
  }

  clearAnswerPitch = () => {
    this.setState({
      answer_pitch: ""
    })
  }

  handleQuit = () => {
    this.setState({
      game_type: ""
    })
  }

  switchGameType = (type) => {
    switch(type) {
      case 'Tone':
        return(
          <ToneGame handleGameStarted={this.handleGameStarted}
                all_tones={this.state.all_tones}
                active_tones={this.state.active_tones}
                handleToneSelection={this.handleToneSelection}
                clearAnswerPitch={this.clearAnswerPitch}
                game_type={this.state.game_type}
                answer_pitch={this.state.answer_pitch}
                answer_freq={this.state.answer_freq}
                handleAnswerPitch={this.handleAnswerPitch}
                handleAnswerFreq={this.handleAnswerFreq}
                handleQuit={this.handleQuit}/>
        )
      case 'Interval':
        return(
            <IntervalGame game_type={this.state.game_type}
                  options={this.state.active_intervals} />
        )
      case 'Keyboard':
        return(
          <Keyboard game_type={this.state.game_type}
                tones={this.state.keyboard_tones} />
        )
      default:
        return(
          <React.Fragment>
            {(this.state.answer_pitch !== "") ? this.handleReset() : null}
            <p>Please select a game type</p>
          </React.Fragment>
        )
    }
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
        {this.switchGameType(this.state.game_type)}
        <br>
        </br>
      </React.Fragment>
    )
  }

}
