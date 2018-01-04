import axios from 'axios'
const api = function (resource, data, methods, token, params) {
  let instance
  if (methods === 'get') {
    instance = axios.create({ baseURL: 'http://localhost:3300/graphql/' })
    setToken(resource, token)
    return instance.get(params)
  } else {
    instance = axios.create({ baseURL: 'http://localhost:3300/api/' })
    setToken(resource, token)
    if (methods === 'post') {
      return instance.post(resource, data)
    }
    if (methods === 'put') {
      return instance.put(resource, data)
    }
  }
  function setToken (resource, token) {
    if (resource !== 'user/login' || resource !== 'user/register') {
      instance.defaults.headers.common['Authorization'] = 'Bearer ' + token
    }
  }
}

export default api
