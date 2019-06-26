import React, { Component } from 'react'
import {BrowserRouter as Router, Route } from 'react-router-dom';
import GameSettings from './GameSettings'
import Game from './Game'

export default class User extends Component {



  render() {
    return(
      <React.Fragment>
        <h1>THIS IS USER COMPONENT</h1>
        <button onClick={ () => console.log("Settings, bruh") }>Settings</button>
        <div className="report">
          <p>This is the report div</p>
        </div>
        <Router>
          <Route exact path="/game-settings" component={GameSettings} />
          <Route exact path="/game" component={Game} />
        </Router>
      </React.Fragment>
    )
  }
}

// From App.js

    // import React from 'react';
    // import {
    //   BrowserRouter as Router,
    //   Route
    // } from 'react-router-dom';
    // import NavBar from '../components/NavBar';
    // import Home from '../components/Home';
    // import Actors from '../components/Actors';
    // import Directors from '../components/Directors';
    // import Movies from '../components/Movies';
    //
    //
    // const App = (props) => {
    //   return (
    //     <Router>
    //       <div className="app">
    //         <NavBar />
    //         <Route exact path="/" component={Home} />
    //         <Route exact path="/actors" component={Actors} />
    //         <Route exact path="/directors" component={Directors} />
    //         <Route exact path="/movies" component={Movies} />
    //       </div>
    //     </Router>
    //   );
    // };
    //
    // export default App
