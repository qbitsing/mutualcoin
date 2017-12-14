import axios from 'axios'
const api = function (resource, data, methods, token) {
  /* var instance = axios.create({ baseURL: 'http://localhost:3300/api/' })
  if (resource !== 'user/login' || resource !== 'user/register') {
    instance.defaults.headers.common['Authorization'] = token
  }
  if (methods === 'get') {
    return instance.get(resource, data)
  } */
  if (methods === 'post') {
    return axios({
      method: 'post',
      baseURL: 'http://localhost:3300/api/',
      url: resource,
      data: data,
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
    // return instance.post(resource, data)
  }
}
export default api
