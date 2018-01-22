import axios from 'axios'
const api = function (data, methods, token, params, resource = '/') {
  let instance
  if (methods === 'get') {
    instance = axios.create({ baseURL: 'http://localhost:3300/graphql' })
    setToken()
    return instance.get(resource, params)
  } else {
    if (methods === 'post') {
      if (resource !== '/') {
        instance = axios.create({ baseURL: 'http://localhost:3300/api/' })
        if (resource !== 'login' && resource !== 'register') {
          setToken()
        }
      } else {
        instance = axios.create({ baseURL: 'http://localhost:3300/graphql' })
        setToken()
      }
      return instance.post(resource, data)
    }
  }
  function setToken () {
    instance.defaults.headers.common['Authorization'] = 'Bearer ' + token
  }
}

export default api
