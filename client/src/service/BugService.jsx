import axios from 'axios'

class BugService {
  static getAllBugs() {
    return axios.get('http://localhost:8080/bug-api/bug')
  }

  static getBug(bugId) {
    return axios.get(`http://localhost:8080/bug-api/bug/${bugId}`)
  }

  static getBugsForProject(projectId) {
    return axios.get(`http://localhost:8080/bug-api/bug/project/${projectId}`)
  }

  static createNewBug(bugBody) {
    return axios.post(`http://localhost:8080/bug-api/bug`, bugBody)
  }

  static updateBug(bugId, bugBody) {
    return axios.put(`http://localhost:8080/bug-api/bug/${bugId}`, bugBody)
  }

  static deleteBug(bugId) {
    return axios.delete(`http://localhost:8080/bug-api/bug/${bugId}`)
  }
}

export default BugService
