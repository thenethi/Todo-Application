import {Component} from 'react'

import {Link} from 'react-router-dom'

import TodoSignup from '../TodoSignup'
import TodoSignin from '../TodoSignin'

import './index.css'

const welcomePageStatus = {
  initial: 'INITIAL',
  login: 'LOGIN',
  signup: 'SIGNUP',
}

class TodoLogin extends Component {
  state = {
    welcomeStatus: welcomePageStatus.initial,
  }

  signInBtnClicked = () => {
    this.setState({welcomeStatus: welcomePageStatus.login})
  }

  signUpBtnClicked = () => {
    this.setState({welcomeStatus: welcomePageStatus.signup})
  }

  renderWelcome = () => (
    <div className="app-container">
      <h1 className="heads">TODO Application</h1>
      <div>
        <Link
          to="/signin"
          type="button"
          className="sign-buttons"
          onClick={this.signInBtnClicked}
        >
          Sign In
        </Link>
        <Link
          to="/signup"
          type="button"
          className="sign-buttons"
          onClick={this.signUpBtnClicked}
        >
          Sign Up
        </Link>
      </div>
    </div>
  )

  render() {
    const {welcomeStatus} = this.state
    switch (welcomeStatus) {
      case 'INITIAL':
        return this.renderWelcome()
      case 'LOGIN':
        return <TodoSignin />
      case 'SIGNUP':
        return <TodoSignup />
      default:
        return this.renderWelcome()
    }
  }
}

export default TodoLogin
