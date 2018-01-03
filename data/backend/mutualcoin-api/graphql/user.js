'use strict'

module.exports = `
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
    phone: String
    hobbies: [String]
    codeReferred: String!
    password: String!
    state: State
    referred: User
    line: [User]
  }

  enum State {
    active
    inactive
  }

  enum Gender {
    male
    female
  }
`
