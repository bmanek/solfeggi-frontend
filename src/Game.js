import React, { Component } from 'react'
import Button from './Button'


export default class Game extends Component {

  generateRandomFreq = this.props.options[Math.floor(Math.random() *
    this.props.options.length)]

  createTone(num, event) {
    let AudioContext = window.AudioContext || window.webkitAudioContext;
    let audioCtx = new AudioContext()
    let oscillator = audioCtx.createOscillator()
    oscillator.type = "sine"
    oscillator.frequency.value = num.freq
    oscillator.start()
    oscillator.stop(.8)
    oscillator.connect(audioCtx.destination)
    this.props.handleAnswer(num.tone.split(" ")[0])
  }

  handleComparison = (event) => {
    (event.target.innerHTML === this.props.answer) ?
    console.log("Good job, buddy!") :
    console.log("Keep at it, chief.")
  }
  //
  // (event.target.dataset.tone === this.props.answer) ? console.log("Yay, you did it!") :
  // console.log("Boo, try harder!")

  // currently the frequency saves in dataset, not state. Is that good?

  render() {
    return(
      <React.Fragment>
        <h1>THIS IS THE GAME COMPONENT</h1>
        <button onClick={(event) => this.createTone(this.generateRandomFreq, event)}>Random Tone</button>
        <br></br>
        <br></br>
        <br></br>
        {this.props.options.map(note => <Button key={note.tone}
        pitch={note.tone.split(" ")[0]}
        handleComparison={this.handleComparison}
        toneDetails={note}/>)}
      </React.Fragment>
    )
  }

}



// FULL GAME LOGIC
//  User presses start
//  App produces random tone (persists and recalls frequency)
//  User guesses (buttons generated from state)
//  App compares frequency saved to button dataset to persisted frequency
  //  If correct, App congratulates user and increases total questions
  //  If incorrect, App increases total and totalWrong with Type of frequency
//  App increments question number
//    If question number is the last, render a game report


// Still getting issues declaring variables:
// Steps: SO, googled 'parsing error: unexpected token'- yarn add -D babel-
// eslint
