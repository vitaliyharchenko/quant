import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

var auth = require('../auth')

class Login extends Component {

  state = {
    username: '',
    pass: ''

  }

  handleSubmit = e => {
      e.preventDefault()

      var username = this.state.username
      var pass = this.state.pass

      auth.login(username, pass, (loggedIn) => {
          if (loggedIn) {
              console.log("Push")
              document.location.replace('/app')
          } else {
          		console.log("Не Ура блеадь")
          }
      })
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {

    return (
      <div className="container">
        <p>Login</p>
        <Form inline onSubmit={this.handleSubmit.bind(this)}>
          <FormGroup>
            <Label for="exampleEmail" hidden>Username</Label>
            <Input type="text" placeholder="Username or Email" name="username" value={ this.state.username } onChange={ this.handleChange } />
          </FormGroup>
          {' '}
          <FormGroup>
            <Label for="examplePassword" hidden>Password</Label>
            <Input type="password" placeholder="Password" name="pass" value={this.state.pass} onChange={ this.handleChange } />
          </FormGroup>
          {' '}
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    )
  }
}

export default Login