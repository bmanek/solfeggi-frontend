import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'


export default class Clicker extends Component {

  render(){
    return(
      <React.Fragment>
        <Button onClick={this.props.handleComparison}>{this.props.pitch}</Button>
      </React.Fragment>
    )
  }
}
