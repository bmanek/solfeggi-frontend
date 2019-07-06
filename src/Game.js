import React, { Component } from 'react'
import Button from './Button'




export default class Game extends Component {

  constructor(props) {
    super(props)
    this.state = {
      question_no: 0,
      responded: false,
      correct_no: 0,
      completed: false,
      toneGenerated: false
    }
  }

  generateRandomFreq = () => {
    return (this.props.options[Math.floor(Math.random() *
    this.props.options.length)]) }

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
      responded: !this.state.completed,
      toneGenerated: false
    })
  }

  toggleToneGeneration = () => {
    let toneSetting = !this.state.toneGenerated
    this.setState({
      toneGenerated: toneSetting
    })
  }

  clearBoard = () => {
    this.setState({
      completed: false,
      responded: false
    })
  }

  assignQuizTone(num, event) {
    if (this.state.toneGenerated === false) {
      let randomTone = num()
      let newToneInState = this.createTone(randomTone, event)
      this.props.handleAnswer(randomTone.tone.split(" ")[0])
      this.clearBoard()
      this.toggleToneGeneration()
    }
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


  // I'm thinking about a hard re-render / decomposition of the createTone, assignQuizTone, and ...what else? method chain. I REALLY don't like how hard it currently is to figure out what's happening in that sequence or separate concerns. I just wanna be able to create fun noises, man.

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
    if ((this.state.responded === false) && (event.target.innerHTML ===
      this.props.answer)) {
      this.incrementTotal()
      this.incrementCorrect()
      this.handleFirstGuess()
      this.toggleRoundComplete()
      this.toggleToneGeneration()
      this.props.clearAnswer()
    }
    if ((this.state.responded === false) && (event.target.innerHTML !==
      this.props.answer)) {
      this.incrementTotal()
      this.reportError(event)
      this.handleFirstGuess()
    }
    if (event.target.innerHTML === this.props.answer) {
      this.toggleRoundComplete()
    }
  }

  // .then( () => {this.handleFirstGuess()})

  // separate button generation into a method that fires onClick of Hear Tone,
  // wrap that + current method in a single carrier method.

  render() {
    return(
      <React.Fragment>
        <h1>{this.props.game_type} Practice</h1>
        <p>{this.state.correct_no} of {this.state.question_no} correct</p>
        <button onClick={(event) =>
          this.assignQuizTone(this.generateRandomFreq, event)}>Hear Tone</
          button>
        <br/>
        <br/>
        <br/>

        {(this.props.game_type === "Tone") ?

        this.props.options.map(note => <Button key={note.tone}
        pitch={note.tone.split(" ")[0]}
        handleComparison={this.handleComparison}
        toneDetails={note} />)
        :
        this.props.options.map(note => <Button key={note.tone}
        pitch={note.tone}
        handleComparison={() => this.createTone(this.generateRandomFreq)}
        toneDetails={note} />)}

      </React.Fragment>
    )
  }

}
