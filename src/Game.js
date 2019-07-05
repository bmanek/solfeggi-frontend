import React, { Component } from 'react'
import Button from './Button'


export default class Game extends Component {

  constructor(props) {
    super(props)
    this.state = {
      question_no: 0,
      responded: false,
      correct_no: 0,
      completed: false
    }
  }

  generateRandomFreq = this.props.options[Math.floor(Math.random() *
    this.props.options.length)]

  handleFirstGuess = () => {
    this.setState({
      responded: true
    })
  }

  incrementTotal = () => {
    let newTotal = (this.state.question_no + 1)
    this.setState({
      question_no: newTotal
    })
  }

  incrementCorrect = () => {
    let newCorrect = (this.state.correct_no + 1)
    this.setState({
      correct_no: newCorrect
    })
  }

  toggleRoundComplete = () => {
    this.setState({
      completed: !this.state.completed,
      responded: !this.state.responded
    })
  }

  assignQuizTone(num, event) {
    debugger
    this.createTone(num, event)
    this.props.handleAnswer(num.tone.split(" ")[0])
  }

  createTone(num, event) {
    let AudioContext = window.AudioContext || window.webkitAudioContext;
    let audioCtx = new AudioContext()
    let oscillator = audioCtx.createOscillator()
    oscillator.type = "sine"
    oscillator.frequency.value = num.freq
    oscillator.start()
    oscillator.stop(.8)
    oscillator.connect(audioCtx.destination)
  }
  // this.props.handleAnswer(num.tone.split(" ")[0])

  reportError = (event) => {
    fetch('http://localhost:3000/api/v1/sessions', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
              "user_id": 3,
              "game_type": this.props.type,
              "type_wrong": event.target.innerText
            })
          })
          .then(res => res.json())
          .then(data => {
              console.log(data)
            })
  }


  handleComparison = (event) => {
    if ((this.state.responded === false) && (event.target.innerHTML === this.props.answer)) {
      this.incrementTotal()
      this.incrementCorrect()
      this.handleFirstGuess()
      this.toggleRoundComplete()
      this.props.clearAnswer()
    }
    if ((this.state.responded === false) && (event.target.innerHTML !== this.props.answer)) {
      this.incrementTotal()
      this.reportError(event)
      this.handleFirstGuess()
    }
  }

  // .then( () => {this.handleFirstGuess()})

  render() {
    return(
      <React.Fragment>
        <h1>{this.props.type} Practice</h1>
        <p>{this.state.correct_no} of {this.state.question_no} correct</p>
        <button onClick={(event) => this.assignQuizTone(this.generateRandomFreq, event)}>Hear Tone</button>
        <br></br>
        <br></br>
        <br></br>
        {this.props.options.map(note => <Button key={note.tone}
        pitch={note.tone.split(" ")[0]}
        handleComparison={this.handleComparison}
        toneDetails={note} />)}
      </React.Fragment>
    )
  }

}
