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
      grabbed: "",
      first: true
    }
  }

  handleGrabbed = (answer) => {
    this.setState({
      grabbed: answer
    })
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
      toneGenerated: false,
      grabbed: ""
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
      this.createTone(randomTone)
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
              "type_wrong": this.props.answer_pitch
            })
          })
          .then(res => res.json())
          .then(data => {
              console.log(data)
            })
  }

  handleComparison = (event) => {
    let grabbed = event.target.innerText
    if ((this.state.responded === false) && (grabbed ===
      this.props.answer_pitch)) {
        console.log(event.target.innerHTML)
      this.incrementTotal()
      this.incrementCorrect()
      this.handleFirstGuess()
      this.toggleRoundComplete()
      this.toggleToneGeneration()
      this.props.clearAnswerPitch()

    }
    else if
      ((this.state.responded === false) && (grabbed !==
      this.props.answer_pitch)) {
      this.incrementTotal()
      this.reportError(event)
      this.handleFirstGuess()
      this.handleGrabbed(grabbed)
    }
    else if (grabbed === this.props.answer_pitch) {
      this.toggleRoundComplete()
    }
    else {
      this.handleGrabbed(grabbed)
    }
  }

  grabAnswer = (event) => {
    console.log(event.target.value)
  }


  render() {
    return(
      <React.Fragment>
        <h1>{this.props.game_type} Practice</h1>
        {(this.state.question_no === 0) ?
            <React.Fragment>
              <p>Add or remove quiz tones by clicking on the notes below. A4 - E5 are included by default.</p>
            </React.Fragment> : null }
        {this.props.all_tones.map(tone => <button key={tone.freq}
          onClick={(event) => this.props.handleToneSelection(event)}>{tone.tone}</button>
        )}
        <h3>{this.state.correct_no} of {this.state.question_no} correct</h3>
        {(this.state.grabbed === "") ? null : <p>Sorry, '{this.state.grabbed}'
            is incorrect</p>}

        {(this.state.completed === true && this.state.completed === true) ?
          <p>Correct! Good job!</p> : null}

        <button onClick={(event) =>
          this.assignQuizTone(this.selectRandomToneObj, event)}>Hear Tone</
          button>
          {(this.state.responded === true) && (this.state.completed === true) ? <button onClick={this.playFromState}>Hear Again</button> : null }
          <br/>

          {(this.state.question_no === 0) ?
            <>
              <p>Selected, possible tones will appear below. Try to identify the pitch you hear!</p>
              <p>(the round continues until you answer correctly)</p>
            </>
            : null }
          <br/>

          {(this.state.toneGenerated === true) ?
            this.props.active_tones.map(tone =>
            <Button pitch={tone.tone.split(" ")[0]} key={tone.tone} freq={tone.freq}
            handleComparison={this.handleComparison} />) : null }
          <br/>
        {(this.state.question_no > 0) ?
        <button onClick={this.props.handleQuit}>Quit</button> : null}
      </React.Fragment>
    )
  }

}
