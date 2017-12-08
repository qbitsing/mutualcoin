import axios from 'axios'
const api = function (resource, data, methods) {
  const instance = axios.create({
    baseURL: 'http://localhost:3300/api/'
  })
  if (methods === 'get') {
    return instance.get(resource, data)
  }
  if (methods === 'post') {
    return instance.post(resource, data)
  }
}
export default api
