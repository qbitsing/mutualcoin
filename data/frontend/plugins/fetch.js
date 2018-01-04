const api = async function (query) {
  let request = await fetch('http://localhost:3300/graphql/?query=' + query)
  return request.json()
}
export default api
