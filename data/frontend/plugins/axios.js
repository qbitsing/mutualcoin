import axios from 'axios'

const api = function (resource, data, methods) {
  var instance = axios.create({
    baseURL: 'https://swapi.co/api/'
  })
  if (methods === 'get') {
    instance.get(resource, data)
      .then(response => response.data)
      .catch(error => error)
  }
  if (methods === 'post') {
    instance.post(resource, data)
      .then(response => response.data)
      .catch(error => error)
  }
}
export default api
