'use strict'

module.exports = {
  User: `
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

    input newUser {
      nickname: String!
      email: String!
      bch: String!
      bchType: String!
      codeReferred: String!
      password: String!
    }

    input userEditable {
      email2: String
      firstName: String
      lastName: String
      age: Int
      birthdate: String
      gender: Gender
      address: String
      phone: String
      hobbies: [String]
    }
  `,
  QueryUser: (db) => ({
    users: (rootValue, args, context) => db.user.get(),
    usersBy: (rootValue, { propertie, value }, context) => db.user.getBy(propertie)(value),
    user: (rootValue, { uuid }, context) => db.user.getUuid(uuid),
    referred: ({ codeReferred }) => db.user.getUuid(codeReferred),
    line: ({ uuid }) => db.user.getLineReferred(uuid),
    userAdd: (_ , { user }) => db.user.register(user),
    userEdit: (_ , { uuid, user }) => db.user.update(uuid, user)
  })
}
