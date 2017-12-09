import axios from 'axios'
const api = function (resource, data, methods) {
  var instance = null
  if (localStorage.getItem('token') != null) {
    instance = axios.create({
      baseURL: 'http://localhost:3300/api/',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
  } else {
    instance = axios.create({ baseURL: 'http://localhost:3300/api/' })
  }
  console.log(instance)
  if (methods === 'get') {
    return instance.get(resource, data)
  }
  if (methods === 'post') {
    return instance.post(resource, data)
  }
}
export default api
