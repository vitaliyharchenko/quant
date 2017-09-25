import auth from '../auth'
import axios from 'axios'

export default {
  getTasks: function (callBack) {
    axios.get('http://quant.zone/api/tasks/', {
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
    var url = 'http://quant.zone/api/tasks/' + pk + '/'
    axios.get(url, {
      headers: auth.getAuthHeaders()
    })
      .then(function (response) {
        callBack(response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  sendTaskResults: function (task, results, callBack) {
    var url = 'http://quant.zone/api/tasks/result/' + task.id + '/'
    var data = {
      'student': task.owner,
      'task': task.id,
      'blocks': results.blocks
    }

    axios.post(url, data, {headers: auth.getAuthHeaders()})
      .then(function (response) {
        callBack(response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}
