import React from 'react'
import ProjectService from '../service/ProjectService'

export default class HomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      projects: [],
    }
  }

  getProjects() {
    ProjectService.getAllProjects()
      .then((res) => {
        console.log(res)
        this.setState({
          projects: res.data,
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  componentDidMount() {
    this.getProjects()
  }

  render() {
    return (
      <div className="col-md-6">
        <h1>Projects</h1>

        <ul className="list-group">
          {this.state.projects &&
            this.state.projects.map((project, index) => (
              <li className="list-group-item " key={index}>
                <h3
                  onClick={() => {
                    this.props.history.push({
                      pathname: '/project/' + project.id,
                      state: {
                        projectId: project.id,
                      },
                    })
                  }}
                >
                  {project.name}
                </h3>
              </li>
            ))}
        </ul>
        <button
          onClick={() => {
            this.props.history.push({
              pathname: '/createProject/',
            })
          }}
        >
          Add project
        </button>
      </div>
    )
  }
}
