import React, { Component } from 'react'


export default class Game extends Component {

  handleSound(num) {
    let AudioContext = window.AudioContext || window.webkitAudioContext;
    let audioCtx = new AudioContext()
    let oscillator = audioCtx.createOscillator()
    oscillator.type = "sine"
    oscillator.frequency.value = num
    oscillator.start()
    oscillator.stop(.8)
    oscillator.connect(audioCtx.destination)
  }
  

  render() {
    return(
      <React.Fragment>
        <h1>THIS IS THE GAME COMPONENT</h1>
        {console.log()}
        <button onClick={() => this.handleSound(this.props.options[Math.floor(Math.random() *
          this.props.options.length)])}>Random Tone</button>
      </React.Fragment>
    )
  }

}
