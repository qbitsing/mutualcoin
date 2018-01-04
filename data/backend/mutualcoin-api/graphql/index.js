'use strict'
const { makeExecutableSchema } = require('graphql-tools')
const User = require('./user')

const rootQuery = `
  type Query {
    users: [User]
    user(uuid: String): User!
  }
`

// module.exports = makeExecutableSchema({typeDefs})
module.exports = function (db) {
  const resolvers = {
    Query: {
      users: (rootValue, args, context) => {
        console.log('user')
        return db.user.get()
        
      },
      user: (rootValue, { uuid }, context) => db.user.getUuid(uuid)
    },
    User: {
      referred: ({ codeReferred }) => db.user.getUuid(codeReferred),
      line: ({ uuid }) => db.user.getLineReferred(uuid)
    }
  }

  return makeExecutableSchema({typeDefs: [rootQuery, User], resolvers})
}
