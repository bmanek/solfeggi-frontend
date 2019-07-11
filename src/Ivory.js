import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'

export default class Ivory extends Component {

  render(){
    return(
      <React.Fragment>
        <Button onClick={() => this.props.createTone(this.props.freq)}>{this.props.name}</Button>
      </React.Fragment>
    )
  }
}
