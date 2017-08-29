import auth from '../auth'
import axios from 'axios'

export default {
  getTask: function (callBack) {
    axios.get('http://localhost/api/tasks/', {
      headers: auth.getAuthHeaders()
    })
      .then(function (response) {
        callBack(response.data[0])
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}
