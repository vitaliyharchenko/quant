import React, { Component } from 'react'
import { Button } from 'reactstrap'

class Main extends Component {
  render() {
    return (
      <div className="container">
        <p>Login</p>
        <Button color="danger">Danger!</Button>
      </div>
    )
  }
}

export default Main