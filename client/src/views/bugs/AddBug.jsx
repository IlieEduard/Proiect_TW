import React from 'react'
import AuthService from '../../service/AuthService'
import BugService from '../../service/BugService'

export default class AddBug extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bug: {
        description: undefined,
        severity: 'LOW',
        priority: undefined,
        link: undefined,
        status: 'ONGOING',
        user: undefined,
      },
      project: undefined,
    }

    this.handleDescChange = this.handleDescChange.bind(this)
    this.handleSeverityChange = this.handleSeverityChange.bind(this)
    this.handlePriorityChange = this.handlePriorityChange.bind(this)
    this.handleLinkChange = this.handleLinkChange.bind(this)
    this.onSave = this.onSave.bind(this)
  }
  componentDidMount() {
    if (this.props.history.location?.state?.bug) {
      this.setState({
        bug: {
          description: this.props.history.location.state.bug.description,
          severity: this.props.history.location.state.bug.severity,
          priority: this.props.history.location.state.bug.priority,
          link: this.props.history.location.state.bug.link,
          status: this.props.history.location.state.bug.status,
          id: this.props.history.location.state.bug.id,
          projectId: this.props.history.location.state.project.id,
        },
        editMode: true,
      })
    } else {
      this.setState({
        project: this.props.history.location.state?.project,
        bug: {
          ...this.state.bug,
          projectId: this.props.history.location.state?.project?.id,
          userId: AuthService.getCurrentUser().id,
        },
      })
    }
  }

  handleSeverityChange(e) {
    this.setState({
      bug: {
        ...this.state.bug,
        severity: e.target.value,
      },
    })
  }

  handleDescChange(e) {
    this.setState({
      bug: {
        ...this.state.bug,
        description: e.target.value,
      },
    })
  }

  handlePriorityChange(e) {
    this.setState({
      bug: {
        ...this.state.bug,
        priority: e.target.value,
      },
    })
  }
  handleLinkChange(e) {
    this.setState({
      bug: {
        ...this.state.bug,
        link: e.target.value,
      },
    })
  }

  onSave() {
    if (this.state.editMode) {
      BugService.updateBug(this.state.bug.id, this.state.bug).then((res) => {
        console.log(res)
      })
    } else {
      BugService.createNewBug(this.state.bug).then((res) => {
        console.log('Created')
        console.log(res)
      })
    }

    let project = this.state.project
      ? this.state.project
      : this.props.history.location.state.project
    this.props.history.push({
      pathname: '/project/' + project.id,
      state: {
        project: project,
        update: true,
      },
    })
    window.location.reload()
  }

  render() {
    return (
      <>
        <form>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              value={this.state.bug.description}
              onChange={this.handleDescChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="severity">Severity</label>
            <select
              value={this.state.bug.severity}
              onChange={this.handleSeverityChange}
              className="form-control"
            >
              <option value="LOW">LOW</option>
              <option value="MED">MED</option>
              <option value="HIGH">HIGH</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <input
              type="text"
              className="form-control"
              id="priority"
              value={this.state.bug.priority}
              onChange={this.handlePriorityChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="link">Link</label>
            <input
              type="text"
              className="form-control"
              id="link"
              value={this.state.bug.link}
              onChange={this.handleLinkChange}
            />
          </div>
          <button onClick={() => this.onSave()}>Save</button>
        </form>
      </>
    )
  }
}
