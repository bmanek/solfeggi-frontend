import React, { Component } from 'react'


export default class Ivory extends Component {

  render(){
    return(
      <React.Fragment>
        <button onClick={() => this.props.createTone(this.props.freq)}>{this.props.name}</button>
      </React.Fragment>
    )
  }
}
