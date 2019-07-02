import React, { Component } from 'react'
import Button from './Button'


export default class Game extends Component {

  constructor(props) {
    super(props)
    this.state = {
      question_no: 0,
      responded: false,
      is_correct: false
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
    //       increaseTotal()
    //       increaseTotalCorrect()
    //       button.changeColor(green)
    //       console.log("Way to go!")
    //       [clear GameSettings state.answer via callback]
    //       [prepare State to generate another random tone]
    //       getNewButtons() :
    //       POST fetch method
    //       increaseTotal()
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
    (this.state.responded === false) ?
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
          "type_wrong": event.target.innerText
        })
      })
      .then(res => res.json())
      .then(data => {
        console.log(data)
      })
      .then( () => {this.handleFirstGuess()})
      : console.log(event.currentTarget.innerHTML)
  }

  render() {
    return(
      <React.Fragment>
        <h1>THIS IS THE GAME COMPONENT</h1>
        <button onClick={(event) => this.assignQuizTone(this.generateRandomFreq, event)}>Random Tone</button>
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
