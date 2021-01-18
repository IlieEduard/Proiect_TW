import axios from 'axios'

class ProjectService {
  static getAllProjects() {
    return axios.get('http://localhost:8080/project-api/project')
  }

  static getProject(projectId) {
    return axios.get(`http://localhost:8080/project-api/project/${projectId}`)
  }

  static addProjectUser(projectId, userId) {
    return axios.post(
      `http://localhost:8080/project-api/project/${projectId}/addUser/${userId}`,
    )
  }

  static removeProjectUser(projectId, userId) {
    return axios.post(
      `http://localhost:8080/project-api/project/${projectId}/removeUser/${userId}`,
    )
  }

  static createNewProject(projectBody) {
    return axios.post(`http://localhost:8080/project-api/project`, projectBody)
  }

  static getUsersForProject(projectId) {
    return axios.get(
      `http://localhost:8080/project-api/project/${projectId}/users/`,
    )
  }

  static updateProject(projectId, projectBody) {
    return axios.put(
      `http://localhost:8080/project-api/project/${projectId}`,
      projectBody,
    )
  }

  static deleteProject(projectId) {
    return axios.delete(
      `http://localhost:8080/project-api/project/${projectId}`,
    )
  }
}

export default ProjectService
