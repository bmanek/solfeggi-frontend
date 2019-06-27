import React, { Component } from 'react'


export default class Game extends Component {;

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

  // and the gainNode to the destination


  // gain.gain.value = 1
// gain.linearRampToValueAtTime(value,endTime)


//   window.AudioContext = window.AudioContext || window.webkitAudioContext;
// var ctx = new AudioContext();
// var o = ctx.createOscillator();
// o.type = e.currentTarget.id;
// o.frequency.value = 261.63;
// o.start(0);
// o.connect(ctx.destination);

  render() {
    return(
      <React.Fragment>
        <h1>THIS IS THE GAME COMPONENT</h1>
        <button onClick={() => this.handleSound(440)}>A4, 440</button>
        <button onClick={() => this.handleSound(493.88)}>B4, 493.88</button>
        <br></br>
        <button onClick={() => this.handleSound(523.25)}>C5, 523.25</button>
        <button onClick={() => this.handleSound(587.33)}>D5, 587.33</button>
      </React.Fragment>
    )
  }

}
