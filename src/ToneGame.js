import React, { Component } from 'react'
import Button from './Button'

export default class ToneGame extends Component {

  constructor(props) {
    super(props)
    this.state = {
      question_no: 0,
      responded: false,
      correct_no: 0,
      completed: false,
      toneGenerated: false,
      first: true
    }
  }


  handleFirstGuess = () => {
    this.setState({
      responded: true
    })
  }

  handleFirstState = () => {
    this.setState({
      first: false
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

  // selectRandomToneObj requires access to props.options (can be
  // state.active_tones or state.all_tones ) and returns a random tone object


  // GETTING RID OF EVENT ARG IN CREATETONE
  selectRandomToneObj = () => {
    return (this.props.active_tones[Math.floor(Math.random() *
      this.props.active_tones.length)]) }

  assignQuizTone(getTone, event) {
    if (this.state.toneGenerated === false) {
      this.generateToneAnswerButtons()
      let randomTone = getTone()
      let newToneInState = this.createTone(randomTone)
      this.props.handleAnswerPitch(randomTone.tone.split(" ")[0])
      this.props.handleAnswerFreq(randomTone.freq)
      this.clearBoard()
      this.toggleToneGeneration()
    } else if (this.props.answer_freq !== 0) {
      this.playFromState()
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
      this.props.active_tones.map(note => <Button key={note.tone}
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
              "game_type": this.props.game_type,
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
      this.props.answer_pitch)) {
      this.incrementTotal()
      this.incrementCorrect()
      this.handleFirstGuess()
      this.toggleRoundComplete()
      this.toggleToneGeneration()
      this.props.clearAnswerPitch()
    }
    else if
      ((this.state.responded === false) && (event.target.innerHTML !==
      this.props.answer_pitch)) {
      this.incrementTotal()
      this.reportError(event)
      this.handleFirstGuess()
    }
    else if (event.target.innerHTML === this.props.answer_pitch) {
      this.toggleRoundComplete()
    }
  }
// (this.props.answer_freq !== 0)


  render() {
    return(
      <React.Fragment>
        <h1>{this.props.game_type} Practice</h1>
        {this.props.all_tones.map(tone => <button 
          onClick={(event) => this.props.handleToneSelection(event)}>{tone.tone}</button>
        )}
        <p>{this.state.correct_no} of {this.state.question_no} correct</p>
        <button onClick={(event) =>
          this.assignQuizTone(this.selectRandomToneObj, event)}>Hear Tone</
          button>
          {(this.state.responded === true) && (this.state.completed === true) ? <button onClick={this.playFromState}>Hear Again</button> : null }
          <br/>
          <br/>
          {(this.state.toneGenerated === true) ?
            this.props.active_tones.map(tone =>
            <Button pitch={tone.tone.split(" ")[0]} freq={tone.freq}
            handleComparison={this.handleComparison} />) : null }
          <br/>
        {(this.state.question_no > 0) ?
        <button onClick={this.props.handleQuit}>Quit</button> : null}
      </React.Fragment>
    )
  }

}
//
//
// this.props.active_tones.map(note => <Button key={note.tone}
// pitch={note.tone}
// handleComparison={() => this.createTone(this.selectRandomToneObj)}
// toneDetails={note} />)
