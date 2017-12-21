'use strict'

const { Schema } = require('mongoose')
const increment = require('simple-mongoose-autoincrement')

const blockSchema = new Schema({
  amount: Number,
  amountLeft: Number,
  coin: String,
  _coin: { type: Schema.Types.ObjectId, ref: 'coin' },
  uuid: String,
  endingDate: Date,
  startDate: Date,
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
  daysInfo: []
})

blockSchema.plugin(increment, { field: 'name' })

module.exports = blockSchema
