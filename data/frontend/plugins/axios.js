import axios from 'axios'
const api = function (resource, data, methods) {
  const instance = axios.create({
    baseURL: 'https://swapi.co/api/'
  })
  if (methods === 'get') {
    return instance.get(resource, data)
  }
  if (methods === 'post') {
    return instance.post(resource, data)
  }
}
export default api
