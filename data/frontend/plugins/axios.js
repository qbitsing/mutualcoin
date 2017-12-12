import axios from 'axios'
const api = function (resource, data, methods) {
  var instance = null
  if (resource === 'user/login' || resource === 'user/register') {
    instance = axios.create({ baseURL: 'http://localhost:3300/api/' })
  } else {
    instance = axios.create({
      baseURL: 'http://localhost:3300/api/',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
  }
  if (methods === 'get') {
    return instance.get(resource, data)
  }
  if (methods === 'post') {
    return instance.post(resource, data)
  }
}
export default api
