'use strict'

const { Schema } = require('mongoose')
const increment = require('simple-mongoose-autoincrement')

const ticketSchema = new Schema({
  subjet: String,
  body: String,
  file: String,
  state: {
    type: String,
    enum: [
      'opened',
      'responsed',
      'customer-reply',
      'closed'
    ]
  },
  date: String,
  answers: [],
  user: String
})

ticketSchema.plugin(increment, { field: 'id' })

module.exports = ticketSchema
