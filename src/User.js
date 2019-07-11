import React, { Component } from 'react'
import {BrowserRouter as Router, Route } from 'react-router-dom';
import GameSettings from './GameSettings'
import { Button } from 'semantic-ui-react'


export default class User extends Component {

// Only tracks number of questions wrong per note. Should be expanded.

constructor(){
  super()
  this.state = {
    errors: ""
  }
}

getStats = () => {
  fetch("http://localhost:3000/api/v1/sessions")
  .then(res => res.json())
  .then(data => {
    this.displayErrors(this.countErrors(data))
    })
  }

countErrors = (data) => {
  let A = 0
  let B = 0
  let C = 0
  let D = 0
  let E = 0
  let F = 0
  let G = 0
  data.map(tone => {
    if (tone.type_wrong === "A") {
      A += 1 }
    if (tone.type_wrong === "B") {
      B += 1 }
    if (tone.type_wrong === "C") {
      C += 1 }
    if (tone.type_wrong === "D") {
      D += 1 }
    if (tone.type_wrong === "E") {
      E += 1 }
    if (tone.type_wrong === "F") {
      F += 1 }
    if (tone.type_wrong === "G") {
      G += 1 }
    })
     return(
      `A: ${A}, B: ${B}, C: ${C}, D: ${D}, E: ${E}, F: ${F}, G: ${G}`
   )
 }

 displayErrors = (errors) => {
   this.setState({
     errors: errors
   })
 }

// incomplete method above. Still unsure how to render directly to page.
// Previously it just console.logged "Settings, bruh"

// BEGINNING THE BUTTON TOGGLE FOR REPORT

  render() {
    return(
      <React.Fragment>
        <img src="./public/solfeggi-banner.jpg"/>
        <h1>Username</h1>
        <h2>You've played 14 games. Would you like to start a new one?</h2>
        <p>Click 'Report' to view your lifetime stats!</p>
        <Button onClick={this.getStats}>Report</Button>
        <div className="report">
        <br>
        </br>
          {(this.state.errors !== "") ?
          this.state.errors.split(",").map(tone => {
            return(<li>{tone} errors</li>)}) : null }
        </div>
        <Router>
          <Route exact path="/game-settings" component={GameSettings} />
        </Router>
      </React.Fragment>
    )
  }
}
