import axios from 'axios'

class UserService {
  static getUser(userId) {
    return axios.get('http://localhost:8080/user-api/user/' + userId)
  }

  static getProjectsForUser(userId) {
    return axios.get(`http://localhost:8080/user-api/user/${userId}/projects`)
  }
}

export default UserService
