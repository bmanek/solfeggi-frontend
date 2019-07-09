import React, { Component } from 'react'
import Ivory from './Ivory'


export default class Keyboard extends Component {

  constructor(props) {
    super(props)
    this.state = {
      shape: "sine"
    }
  }

  handleShape(event) {
    this.setState({ shape: event.target.value})
  }

  createTone = (freq) => {
    let AudioContext = window.AudioContext || window.webkitAudioContext;
    let audioCtx = new AudioContext()
    let oscillator = audioCtx.createOscillator()
    oscillator.type = this.state.shape
    oscillator.frequency.value = freq
    oscillator.start()
    oscillator.stop(.8)
    oscillator.connect(audioCtx.destination)
  }


  render() {
    return(
      <React.Fragment>
        <h1>Keyboard Practice</h1>
        <select value={this.state.shape} onChange={(event) => this.handleShape(event)}>
        <option></option>
        <option value="sine">Sine</option>
        <option value="triangle">Triangle</option>
        <option value="square">Square</option>
        <option value="sawtooth">Sawtooth</option>
        </select>
        <br>
        </br>
        <br>
        </br>
        {this.props.tones.map(tone => <Ivory name={tone.tone} freq={tone.freq}
          createTone={this.createTone}
          />)}
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
