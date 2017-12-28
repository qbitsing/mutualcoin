'use strict'

const { Schema } = require('mongoose')

const blockUserSchema = new Schema({
  block: String,
  _block: {type: Schema.Types.ObjectId, ref: 'block'},
  user: String,
  _user: { type: Schema.Types.ObjectId, ref: 'user' },
  uuid: String,
  amount: Number,
  high: Number,
  medium: Number,
  low: Number,
  pays: [],
  last_pay: Number
})

module.exports = blockUserSchema
