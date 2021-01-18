import React from 'react'
import AuthService from '../../service/AuthService'
import UserService from '../../service/UserService'
import { Link } from 'react-router-dom'

export default class User extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: undefined,
      projects: undefined,
    }
  }

  componentDidMount() {
    UserService.getProjectsForUser(AuthService.getCurrentUser().id).then(
      (res) => {
        console.log(res)
        this.setState({
          user: AuthService.getCurrentUser(),
          projects: res.data,
        })
      },
    )
  }

  render() {
    return (
      <>
        <div>
          <h4>Username</h4>
          <div>{this.state.user?.username}</div>
          <h4>Email</h4>
          <div>{this.state.user?.email}</div>
          <h4>Projects</h4>
          {this.state.projects?.map((value, index) => (
            <>
              <Link
                to={{
                  pathname: '/project/' + value.id,
                  state: {
                    project: value,
                  },
                }}
              >
                <div>
                  <div>Name: {value.name}</div>
                  <div>Description: {value.description}</div>
                  <div>Repository: {value.repository}</div>
                  <br />
                </div>
              </Link>
            </>
          ))}
        </div>
      </>
    )
  }
}
