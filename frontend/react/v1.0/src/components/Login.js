import React, { Component } from 'react'

var auth = require('../auth')

class Main extends Component {

	handleSubmit = e => {
      e.preventDefault()

      var username = this.refs.username.value
      var pass = this.refs.pass.value

      auth.login(username, pass, (loggedIn) => {
          if (loggedIn) {
          		console.log("Ура блеадь")
          } else {
          		console.log("Не Ура блеадь")
          }
      })
  }

  render() {
    return (
      <div className="container">
        <p>Login</p>
        <form onSubmit={this.handleSubmit}>
	          <input type="text" placeholder="username" ref="username" />
	          <input type="password" placeholder="password" ref="pass" />
	          <input type="submit" />
	      </form>
      </div>
    )
  }
}

export default Main