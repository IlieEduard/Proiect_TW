import { Router, Route, Link, Switch } from 'react-router-dom'
import HomePage from './views/HomePage'
import AddProject from './views/project/AddProject.jsx'
import { createBrowserHistory } from 'history'
import ViewProject from './views/project/ViewProject'
import AddBug from './views/bugs/AddBug'
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './views/login/Login'
import Register from './views/login/Register'
import AuthService from './service/AuthService'
import ViewBug from './views/bugs/ViewBug'
import User from './views/login/User'
import Navbar from './views/Navbar'

const history = createBrowserHistory()

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.logOut = this.logOut.bind(this)

    this.state = {
      currentUser: null,
    }
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser()

    if (user) {
      this.setState({
        currentUser: user,
      })
    }
  }

  logOut() {
    AuthService.logout()
  }

  render() {
    if (!this.state.currentUser) {
      return (
        <>
          <Navbar />
          <h3 style={{ textAlign: 'center' }}>Please log in or register</h3>
          <div className="container mt-3">
            <Switch history={history}>
              <Route exact path="/login/" component={Login} />
              <Route exact path="/register/" component={Register} />
            </Switch>
          </div>
        </>
      )
    }

    return (
      <div>
        <Navbar currentUser={this.state.currentUser} />
        <div className="container mt-3">
          <Switch history={history}>
            <Route exact path="/" component={HomePage} />
            <Route path="/createProject/" component={AddProject} />
            <Route path="/project/" component={ViewProject} />
            <Route path="/addBug/" component={AddBug} />
            <Route exact path="/login/" component={Login} />
            <Route exact path="/register/" component={Register} />
            <Route exact path="/user/" component={User} />
            <Route path="/bug/" component={ViewBug} />
          </Switch>
        </div>
      </div>
    )
  }
}
