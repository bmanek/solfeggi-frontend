import React, { Component } from 'react'
import Button from './Button'


export default class Game extends Component {

  randomFreq = this.props.options[Math.floor(Math.random() *
    this.props.options.length)]

  createRandomTone(num) {
    let AudioContext = window.AudioContext || window.webkitAudioContext;
    let audioCtx = new AudioContext()
    let oscillator = audioCtx.createOscillator()
    oscillator.type = "sine"
    oscillator.frequency.value = num
    oscillator.start()
    oscillator.stop(.8)
    oscillator.connect(audioCtx.destination)
    this.props.holdAnswer(num)
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


  render() {
    return(
      <React.Fragment>
        <h1>THIS IS THE GAME COMPONENT</h1>
        <button onClick={() => this.createRandomTone(this.randomFreq)}>Random Tone</button>
        <br></br>
        <br></br>
        <br></br>
        {this.props.options.map(option => <Button />)}
      </React.Fragment>
    )
  }

}
