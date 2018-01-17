'use strict'

const mongosse = require('mongoose')
const ticketSchema = require('../models/ticket')
let TicketModel

async function create(ticket) { 
  const ticketToCreate = new TicketModel()

  ticketToCreate.subject = ticket.subject
  ticketToCreate.body = ticket.body
  ticketToCreate.file = ticket.file
  ticketToCreate.date = ticket.date
  ticketToCreate.user = ticket.user
  ticketToCreate.state = 'opened'

  return await ticketToCreate.save()
}

module.exports = function (db) { 
  TicketModel = mongosse.model('ticket', ticketSchema)

  ticketMethods = {}
  ticketMethods.create = create
  
  return ticketMethods
}