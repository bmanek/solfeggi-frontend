import React, { Component } from 'react'
import Clicker from './Clicker'
import ButtonList from './ButtonList'
import { Button } from 'semantic-ui-react'

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

  createTone = (event) => {
    debugger
    let AudioContext = window.AudioContext || window.webkitAudioContext;
    let audioCtx = new AudioContext()
    let oscillator = audioCtx.createOscillator()
    oscillator.type = "sine"
    debugger
    oscillator.frequency.value = event.target.value
    oscillator.start()
    oscillator.stop(.8)
    oscillator.connect(audioCtx.destination)
  }


  render() {
    return(

      <div>



        <ButtonList
          allTones={this.props.all_tones}
          createTone={this.createTone}
        />

      </div>
    )
  }

}
