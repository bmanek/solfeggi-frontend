import React, { Component } from 'react'
import Button from './Button'

export default class Keyboard extends Component {

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  playFromState = () => {
    let AudioContext = window.AudioContext || window.webkitAudioContext;
    let audioCtx = new AudioContext()
    let oscillator = audioCtx.createOscillator()
    oscillator.type = "sine"
    oscillator.frequency.value = this.props.answer_freq
    oscillator.start()
    oscillator.stop(.8)
    oscillator.connect(audioCtx.destination)
  }

  generateToneAnswerButtons = () => {
    if (this.state.first === true) {
      this.props.options.map(note => <Button key={note.tone}
        pitch={note.tone.split(" ")[0]}
        handleComparison={this.handleComparison}
        toneDetails={note} />)
        this.handleFirstState()
      }
    }

// creates oscillator when provided a tone object
  createTone(toneObj) {
    let AudioContext = window.AudioContext || window.webkitAudioContext;
    let audioCtx = new AudioContext()
    let oscillator = audioCtx.createOscillator()
    oscillator.type = "sine"
    oscillator.frequency.value = toneObj.freq
    oscillator.start()
    oscillator.stop(.8)
    oscillator.connect(audioCtx.destination)
  }


  render() {
    return(
      <React.Fragment>
        <h1>Keyboard Practice</h1>
        <p>Under Construction</p>
      </React.Fragment>
    )
  }

}
//
//
// this.props.options.map(note => <Button key={note.tone}
// pitch={note.tone}
// handleComparison={() => this.createTone(this.selectRandomToneObj)}
// toneDetails={note} />)
