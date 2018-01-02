import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

export default (ctx) => {
  const httpLink = new HttpLink({ uri: 'http://localhost:3300/graphql' })

  // auth token
  // let token = ctx.isServer ? ctx.req.authToken : window.__NUXT__.state.session
  let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6dHJ1ZSwibmlja25hbWUiOiJhZG1pbiIsInV1aWQiOiI0ZTBlNmQ0Mi05MGZkLTQ0MWUtYjYxNi0yOTAwZjk2NWQ0NTkiLCJiY2giOiJuYWRhIiwiYmNoVHlwZSI6IkJsb2NrY2hhaW4iLCJob2JiaWVzIjpbXSwiY29kZVJlZmVycmVkIjoiY29kZUdlcmFyZG8iLCJpYXQiOjE1MTQ5MjczODB9.hKMRDruUS_F6zx_08Dvnh2_BznZoc2p6FHklMiXH6SQ'

  // middleware
  const middlewareLink = new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: { authorization: `Bearer ${token}` }
    })
    return forward(operation)
  })
  const link = middlewareLink.concat(httpLink)
  return {
    link,
    cache: new InMemoryCache()
  }
}
