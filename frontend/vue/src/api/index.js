import auth from '../auth'

export default {
  getTask (cb) {
    setTimeout(() => cb(_products), 100)
  }

  getTask: function (callBack) {
    var vm = this

    axios.get('http://localhost/api/tasks/', {
      headers: auth.getAuthHeaders()
    })
      .then(function (response) {
        vm.response = response
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}