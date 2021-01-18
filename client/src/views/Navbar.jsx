import React from 'react'
import { Link } from 'react-router-dom'
import AuthService from '../service/AuthService'

export default class Navbar extends React.Component {
  constructor(props) {
    super(props)
  }

  logOut() {
    AuthService.logout()
  }

  render() {
    return (
      <>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={'/'} className="nav-link">
                Home
              </Link>
            </li>
          </div>

          {this.props.currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={'/user'} className="nav-link">
                  {this.props.currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  Logout
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={'/login'} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={'/register'} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>
      </>
    )
  }
}
