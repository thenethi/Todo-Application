import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Signup from '../signup.svg'

import './index.css'

class TodoSignup extends Component {
  state = {
    username: '',
    password: '',
    gender: '',
    location: '',
    name: '',
    statusText: '',
    backPage: false,
  }

  signUpUserInput = event => {
    this.setState({username: event.target.value})
  }

  signUpPassInput = event => {
    this.setState({password: event.target.value})
  }

  onChangeGender = event => {
    this.setState({gender: event.target.value})
  }

  onChangeLocation = event => {
    this.setState({location: event.target.value})
  }

  onChangeName = event => {
    this.setState({name: event.target.value})
  }

  onSubmitSuccess = responseStatus => {
    const {history} = this.props
    this.setState({statusText: responseStatus})
    history.replace('/signin')
  }

  onSubmitFailure = responseStatus => {
    this.setState({statusText: responseStatus})
  }

  signUpPage = async event => {
    event.preventDefault()
    const {username, password, name, location, gender} = this.state
    const userDetails = {username, password, name, location, gender}
    const url = 'https://todo-backend-production-0e38.up.railway.app/register/'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(data.responseStatus)
    } else {
      this.onSubmitFailure(data.responseStatus)
    }
  }

  backtoLoginPage = () => {
    this.setState({backPage: true})
  }

  render() {
    const {
      username,
      password,
      name,
      location,
      gender,
      statusText,
      backPage,
    } = this.state
    if (backPage) {
      return <Redirect to="/signin" />
    }
    return (
      <div className="signup-container">
        <img src={Signup} alt="svg-icon" className="svg-im" />
        <form className="form-container" onSubmit={this.signUpPage}>
          <h1 className="title">SIGN UP</h1>
          <label htmlFor="sign-up-username">USERNAME</label>
          <input
            type="text"
            placeholder="Enter your Username"
            id="sign-up-username"
            value={username}
            onChange={this.signUpUserInput}
          />
          <label htmlFor="name">NAME</label>
          <input
            type="text"
            placeholder="Enter your name"
            id="name"
            value={name}
            onChange={this.onChangeName}
          />
          <label htmlFor="sign-up-password">PASSWORD</label>
          <input
            type="password"
            placeholder="Enter your Password"
            id="sign-up-password"
            value={password}
            onChange={this.signUpPassInput}
          />
          <label htmlFor="gender">GENDER</label>
          <div className="gender-container">
            <input
              type="radio"
              id="male"
              value={gender}
              onChange={this.onChangeGender}
              name="gender"
            />
            <label htmlFor="male" className="gender-item">
              Male
            </label>
          </div>
          <div className="gender-container">
            <input
              type="radio"
              id="female"
              value={gender}
              onChange={this.onChangeGender}
              name="gender"
            />
            <label htmlFor="female" className="gender-item">
              Female
            </label>
          </div>
          <label htmlFor="location">LOCATION</label>
          <input
            type="text"
            placeholder="Enter your Location"
            id="location"
            value={location}
            onChange={this.onChangeLocation}
          />
          <button to="/login" type="submit" className="sign-buttons">
            Sign Up
          </button>

          <button
            type="button"
            className="sign-buttons"
            onClick={this.backtoLoginPage}
          >
            Back to Login
          </button>
          <p className="para">{statusText}</p>
        </form>
      </div>
    )
  }
}

export default TodoSignup
