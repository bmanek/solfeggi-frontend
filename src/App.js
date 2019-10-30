import React from 'react';
import GameSettings from './GameSettings'
import './App.css';
import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#37474f',
    },
    secondary: {
      main: '#43a047'
    },
  }
});

function App() {

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <GameSettings />
      </ThemeProvider>
    </div>
  );
}

export default App
