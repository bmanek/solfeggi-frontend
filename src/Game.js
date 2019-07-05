import React, { Component } from 'react'
import Button from './Button'


export default class Game extends Component {

  constructor(props) {
    super(props)
    this.state = {
      question_no: 0,
      responded: false,
      correct_no: 0
    }
  }

  generateRandomFreq = this.props.options[Math.floor(Math.random() *
    this.props.options.length)]

  handleFirstGuess = () => {
    this.setState({
      responded: true
    })
  }

// What are the conditions of a guess?
// [ANSWER BUTTONS DON'T APPEAR UNTIL 'HEAR TONE' IS PRESSED]
// - Is this the first guess?
//   - YES:
//     - Is it correct? (check by comparing event.target... to State.answer)
//       - YES:
//         - Increase total questions
//         - Increase number correct
//         - Change button color to GREEN
//         - Print congratulatory message
//         - Clear State.Answer
//         - Prepare State to generate another random tone
//         - Generate new buttons, change text of buttons(?)
//       - NO:
//         - Generate / send error to DB
//         - Increase total questions
//         - Change button color to RED
//         - Print concilliatory message
//   - NO:
//     - Is it correct?
//       - YES:
//         - Change button color to GREEN
//         - Print congratulatory message
//         - Clear State.Answer
//         - Prepare State to generate another random tone
//         - Generate new buttons, change text of buttons(?)
//       - NO:
//         - Change button color to RED
//         - Print concilliatory message

    // handleGuess = (event) => {
    //   this.state.responded === false ?
    //     event.target.value === this.props.answer ?
    //       incrementTotal()
    //       increaseTotalCorrect()
    //       button.changeColor(green)
    //       console.log("Way to go!")
    //       [clear GameSettings state.answer via callback]
    //       [prepare State to generate another random tone]
    //       getNewButtons() :
    //       POST fetch method
    //       incrementTotal()
    //       button.changeColor(red)
    //       console.log("Sorry, "{this.tone}" isn't correct") :
    //       event.target.value === this.props.answer ?
    //         button.changeColor(green)
    //         console.log("Way to go!")
    //         [clear GameSettings state.answer via callback]
    //         [prepare State to generate another random tone]
    //         getNewButtons() :
    //         button.changeColor(red)
    //         console.log("Sorry, "{this.tone}" isn't correct")
    // }


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


  assignQuizTone(num, event) {
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

  handleComparison = (event) => {
    this.incrementTotal
    ((this.state.responded === false) && (event.target.innerHTML === this.props.answer))
     ? this.incrementCorrect()
     :
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
          "type_wrong": event.target.innerText
        })
      })
      .then(res => res.json())
      .then(data => {
        console.log(data)
      })
      .then( () => {this.handleFirstGuess()})
  }

  render() {
    return(
      <React.Fragment>
        <h1>THIS IS THE GAME COMPONENT</h1>
        <p>{this.state.correct_no} of {this.state.question_no} correct</p>
        <button onClick={(event) => this.assignQuizTone(this.generateRandomFreq, event)}>Random Tone</button>
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
