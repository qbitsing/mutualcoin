'use strict'

const { Schema } = require('mongoose')

const blockUserSchema = new Schema({
  block: String,
  user: String,
  uuid: String,
  amount: Number,
  high: Number,
  medium: Number,
  low: Number,
  pays: [],
  last_pay: Number
})

module.exports = blockUserSchema
