'use strict'
const { makeExecutableSchema } = require('graphql-tools')

const typeDefs = `
  type User {
    admin: Boolean
    nickname: String
    email: String!
    email2: String
    bch: String!
    bchType: String!
    uuid: String!
    firstName: String
    lastName: String
    age: Int
    birthdate: String
    gender: Gender
    address: String
    phone: Int
    hobbies: [String]
    codeReferred: String!
    password: String!
    state: State
  }

  enum State {
    active
    inactive
  }

  enum Gender {
    male
    female
  }

  type Query {
    users: [User]
  }
`

// module.exports = makeExecutableSchema({typeDefs})
module.exports = function (db) {
  const resolvers = {
    Query: {
      users: (rootValue, args, context) => {
        console.log(context.user)
        return db.user.get()
      }
    }
  }

  return makeExecutableSchema({typeDefs, resolvers})
}
