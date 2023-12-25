import {Component} from 'react'

import {Redirect} from 'react-router-dom'

import Cookie from 'js-cookie'

import Todosignin from '../todosignin.svg'

import './index.css'

class TodoSignin extends Component {
  state = {username: '', password: '', showSubmitError: false, errorMsg: ''}

  loginUserInput = event => {
    this.setState({username: event.target.value})
  }

  loginPassInput = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookie.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
    console.log('logged in successful')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  signInPage = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://todo-backend-production-0e38.up.railway.app/login/'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    console.log(response)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, errorMsg, showSubmitError} = this.state
    const jwt = Cookie.get('jwt_token')
    if (jwt !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="sign-in-container">
        <img src={Todosignin} alt="todo-signin" className="sign-in-image" />
        <form className="form-containers" onSubmit={this.signInPage}>
          <h1>Welcome to the Login Page</h1>
          <label htmlFor="username-id">USERNAME</label>
          <input
            type="text"
            placeholder="Enter your Username"
            id="username-id"
            value={username}
            onChange={this.loginUserInput}
          />
          <label htmlFor="password-id">PASSWORD</label>
          <input
            type="password"
            placeholder="Enter your Password"
            id="password-id"
            value={password}
            onChange={this.loginPassInput}
          />
          <button type="submit" className="sign-buttons">
            Sign in
          </button>
          {showSubmitError && <p className="para">* {errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default TodoSignin
