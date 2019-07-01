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


// Seems like we had one successful POST to the backend, but this is starting
// to get mean. Hardcoded data is no bueno, but this is a first pass to check
// routes and all that. Not too happy to leave an incomplete function for future
// me to play with, but I'm getting tired and it's late.
//
// Other context to the problem: server returns error
// Unhandled Rejection (SyntaxError): Unexpected end of JSON input
// and it's pointing to the fetch line (ln 34). Good luck, bud.

  handleComparison = (event) => {
    (event.target.innerHTML === this.props.answer) ?
    console.log("Yay, correct! Change button to green") :
      fetch('http://localhost:3000/api/v1/sessions', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          "user_id": 2,
          "game_type": "tone",
          "total_questions": 25,
          "number_wrong": 3,
          "type_wrong": "C"
        })
      })
      .then(res => res.json())
      .then(data => {
        console.log(data)
      })
  }

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
