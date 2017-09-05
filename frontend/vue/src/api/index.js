import auth from '../auth'
import axios from 'axios'

export default {
  getTasks: function (callBack) {
    axios.get('http://localhost/api/tasks/', {
      headers: auth.getAuthHeaders()
    })
      .then(function (response) {
        callBack(response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  getTask: function (pk, callBack) {
    var url = 'http://localhost/api/tasks/' + pk + '/'
    axios.get(url, {
      headers: auth.getAuthHeaders()
    })
      .then(function (response) {
        callBack(response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}
