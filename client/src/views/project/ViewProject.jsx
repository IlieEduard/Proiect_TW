import React from 'react'
import AuthService from '../../service/AuthService'
import BugService from '../../service/BugService'
import ProjectService from '../../service/ProjectService'

export default class ViewProject extends React.Component {
  constructor(props) {
    super(props)
    this.deleteProject = this.deleteProject.bind(this)
    this.editProject = this.editProject.bind(this)
    this.getProject = this.getProject.bind(this)
    this.joinProject = this.joinProject.bind(this)
    this.leaveProject = this.leaveProject.bind(this)

    this.state = {
      bugs: undefined,
      project: undefined,
      update: false,
      users: undefined,
    }
  }

  componentDidMount() {
    this.resetAndReload()
  }

  leaveProject() {
    ProjectService.removeProjectUser(
      this.state.project.id,
      AuthService.getCurrentUser()?.id,
    ).then(this.setState({ update: true }))
  }

  joinProject() {
    ProjectService.addProjectUser(
      this.state.project.id,
      AuthService.getCurrentUser()?.id,
    ).then(this.setState({ update: true }))
  }

  getProject() {
    if (this.props.history.location.state?.project) {
      this.setState({
        project: this.props.history.location.state.project,
        update: true,
      })
      BugService.getBugsForProject(
        this.props.history.location.state?.project?.id,
      )
        .then((res) => {
          this.setState({
            bugs: res.data,
          })
        })
        .then(() => {
          ProjectService.getUsersForProject(
            this.props.history.location.state?.project?.id,
          ).then((res) => {
            this.setState({
              users: res.data,
            })
          })
        })
    } else {
      ProjectService.getProject(
        this.props.history.location.state.projectId,
      ).then((res) => {
        this.setState({
          project: res.data,
        })
        console.log(res)
        BugService.getBugsForProject(res.data.id)
          .then((res) => {
            this.setState({
              bugs: res.data,
            })
            console.log(res)
          })
          .then(() => {
            ProjectService.getUsersForProject(
              this.props.history.location.state?.projectId,
            ).then((res) => {
              console.log(res)
              this.setState({
                users: res.data,
              })
            })
          })
      })
    }
  }

  resetAndReload() {
    this.getProject()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.update) {
      this.resetAndReload()
      this.setState({
        update: false,
      })
    }
  }

  deleteProject() {
    ProjectService.deleteProject(
      this.props.history.location.state.project.id,
    ).then(
      (res) => {
        this.props.history.push({
          pathname: '/',
        })
      },
      (err) => {
        console.log('ERROR')
      },
    )
  }

  editProject() {
    this.props.history.push({
      pathname: '/createProject/' + this.state.project.id,
      state: {
        project: this.state.project,
      },
    })
  }

  render() {
    return (
      <>
        <div>
          <h4>Name</h4>
          <div>{this.state.project?.name}</div>
          <h4>Description</h4>
          <div>{this.state.project?.description}</div>
          <h4>Repository</h4>
          <div>{this.state.project?.repository}</div>
          <h4>Bugs</h4>
          {this.state.bugs?.map((bug, index) => (
            <ul>
              <li className={'list-group-item'} key={bug.id}>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                  onClick={() => {
                    if (
                      this.state.users?.find(
                        (item) => item.id === AuthService.getCurrentUser().id,
                      )
                    ) {
                      this.props.history.push({
                        pathname: '/bug/' + bug.id,
                        state: {
                          bug: bug,
                          project: this.state.project,
                        },
                      })
                    }
                  }}
                >
                  <div>
                    Description:
                    <h3>{bug.description}</h3>
                  </div>
                  <div>
                    Status:
                    <br />
                    {bug.status}
                  </div>
                  <div>
                    Priority:
                    <br />
                    {bug.priority}
                  </div>
                  <div>
                    Severity:
                    <br />
                    {bug.severity}
                  </div>
                </div>
              </li>
            </ul>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          {this.state.users?.find(
            (item) => item.id === AuthService.getCurrentUser().id,
          ) ? (
            <>
              <button onClick={this.deleteProject}>Delete</button>
              <button onClick={this.editProject}>Edit</button>
              <button
                onClick={() =>
                  this.props.history.push({
                    pathname: '/addBug',
                    state: {
                      project: this.state.project,
                    },
                  })
                }
              >
                Add bug
              </button>
            </>
          ) : (
            ''
          )}
          {this.state.users?.find(
            (item) => item.id === AuthService.getCurrentUser().id,
          ) ? (
            <button onClick={this.leaveProject}>Leave project</button>
          ) : (
            <button onClick={this.joinProject}>Join project</button>
          )}
        </div>
      </>
    )
  }
}
