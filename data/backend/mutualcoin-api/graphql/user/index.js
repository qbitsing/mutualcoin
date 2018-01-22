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
      nickname: String
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
    users: (no, args, { user }) => db.user.get(user),
    usersBy: (no, { propertie, value }, { user }) => db.user.getBy(propertie, user)(value),
    user: (no, { uuid }, { user }) => db.user.getUuid(uuid, user),
    referred: ({ codeReferred }, { user }) => db.user.getUuid(codeReferred, user, true),
    line: ({ uuid }) => db.user.getLineReferred(uuid),
    userAdd: (no, { user }) => db.user.register(user),
    userEdit: (no, { uuid, user }, context) => db.user.update(uuid, user, context.user)
  })
}
