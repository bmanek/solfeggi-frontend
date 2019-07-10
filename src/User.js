import React, { Component } from 'react'
import {BrowserRouter as Router, Route } from 'react-router-dom';
import GameSettings from './GameSettings'

export default class User extends Component {

getStats = () => {
  fetch("http://localhost:3000/api/v1/sessions")
  .then(res => res.json())
  .then(data => {
    data.map(error => {
      console.log(error.type_wrong)
    })
  })
}


// incomplete method above. Still unsure how to render directly to page.
// Previously it just console.logged "Settings, bruh"

  render() {
    return(
      <React.Fragment>
        <h1>THIS IS USER COMPONENT</h1>
        <button onClick={this.getStats}>Report</button>
        <div className="report">
          <p>This is the report div</p>
        </div>
        <Router>
          <Route exact path="/game-settings" component={GameSettings} />
        </Router>
      </React.Fragment>
    )
  }
}
