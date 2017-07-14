import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { Button } from 'reactstrap'

class Main extends Component {
  render() {
    return (
      <div className="container">
        <p>MainPage</p>
        <Button color="danger">Danger!</Button>
      </div>
    )
  }
}

export default Main