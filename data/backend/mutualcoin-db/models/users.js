'use strict'

const Schema = require('mongoose').Schema

const usersSchema = new Schema({
  admin: {
    type: Boolean,
    default: false
  },
  nickname: {
    type: String
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
  email2: {
    type: String
  },
  bch: {
    type: String,
    unique: true,
    require: true
  },
  bchType: {
    type: String,
    require: true
  },
  uuid: {
    type: String,
    unique: true,
    require: true
  },
  firstName: String,
  lastName: String,
  age: Number,
  birthdate: String,
  gender: {
    type: String,
    enum: ['male', 'female']
  },
  address: String,
  phone: Number,
  hobbies: [String],
  codeReferred: String,
  password: {
    type: String,
    require: true
  },
  state: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  }
})

module.exports = usersSchema
