import React from 'react'
import ProjectService from '../../service/ProjectService'

export default class AddProject extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: undefined,
      name: undefined,
      description: undefined,
      repository: undefined,
      editMode: false,
    }

    this.handleDescChange = this.handleDescChange.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleRepoChange = this.handleRepoChange.bind(this)
    this.onSave = this.onSave.bind(this)
  }

  componentDidMount() {
    if (this.props.history.location?.state?.project) {
      this.setState({
        editMode: true,
        name: this.props.history.location.state.project.name,
        description: this.props.history.location.state.project.description,
        repository: this.props.history.location.state.project.repository,
        id: this.props.history.location.state.project.id,
      })
    }
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value })
  }

  handleDescChange(e) {
    this.setState({ description: e.target.value })
  }

  handleRepoChange(e) {
    this.setState({ repository: e.target.value })
  }

  onSave() {
    if (this.state.editMode) {
      let project = {
        id: this.state.id,
        name: this.state.name,
        description: this.state.description,
        repository: this.state.repository,
      }
      ProjectService.updateProject(this.state.id, project).then((res) => {
        console.log(res)
      })
      this.props.history.push({
        pathname: '/',
      })
      window.location.reload()
    } else {
      let project = {
        id: this.state.id,
        name: this.state.name,
        description: this.state.description,
        repository: this.state.repository,
      }
      ProjectService.createNewProject(project).then((res) => {
        console.log('Created', res)
      })
      this.props.history.push({
        pathname: '/',
      })
      window.location.reload()
    }
  }

  render() {
    return (
      <>
        <form>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={this.state.name}
              onChange={this.handleNameChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              value={this.state.description}
              onChange={this.handleDescChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="repo">Repository</label>
            <input
              type="text"
              className="form-control"
              id="repo"
              value={this.state.repository}
              onChange={this.handleRepoChange}
            />
          </div>
          <button onClick={this.onSave}>Save</button>
        </form>
      </>
    )
  }
}
