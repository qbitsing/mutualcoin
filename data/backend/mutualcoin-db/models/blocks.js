'use strict'

const { Schema } = require('mongoose')
const increment = require('simple-mongoose-autoincrement')

const blockSchema = new Schema({
  amount: Number,
  amountLeft: Number,
  coin: String,
  uuid: String,
  endingDate: String,
  startDate: String,
  weeks: Number,
  days: Number,
  user: String,
  state: {
    type: String,
    enum: [
      'paused',
      'active',
      'finished',
      'cancel',
      'inactive',
      'running',
      'waiting'
    ],
    default: 'inactive'
  },
  runDays: Number,
  daysInfo: [],
  last_pay: Number
})

blockSchema.plugin(increment, { field: 'name' })

module.exports = blockSchema
