import React from 'react';
import User from './User'
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="bigbox">
        <User />
      </div>
    </div>
  );
}

export default App

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



// From NavBar.js
    // export default App;
    //
    //
    // import { NavLink } from 'react-router-dom';
    //
    // const NavBar = () => {
    //   return (
    //     <div className="navbar">
    //       <NavLink to="/">Home</NavLink>
    //       <NavLink to="/movies">Movies</NavLink>
    //       <NavLink to="/directors">Directors</NavLink>
    //       <NavLink to="/actors">Actors</NavLink>
    //     </div>
    //   );
    // };
    //
    // export default NavBar;
