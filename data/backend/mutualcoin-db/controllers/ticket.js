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
  ticketToCreate.answer = []
  ticketToCreate.state = 'opened'

  return await ticketToCreate.save()
}

async function answer(uuid, response) { 
  let { answers, _id, state } = await TicketModel.findOne({ uuid })

  if (!_id) {
    throw new Error('Bad request: the specified ticket does not exist')
  }

  if (state === 'closed') {
    throw new Error('Bad request: the specified ticket is closed')
  }

  if (response.from === 'admin') {
    state = 'responsed'
  } else { 
    state = 'customer-reply'
  }

  answers.push(response)

  await TicketModel.findByIdAndUpdate(_id, { answers, state })

  return await TicketModel.findById(_id)
}

function get(user) {
  if (user) { 
    return TicketModel.find({ user })
  }
  return TicketModel.find()
}

function getActives(user) { 
  if (user) { 
    return TicketModel.find({ user, state: { $not: 'closed' } })
  }

  return TicketModel.find({ state: { $not: 'closed' } })
}

module.exports = function (db) { 
  TicketModel = mongosse.model('ticket', ticketSchema)

  ticketMethods = {}
  ticketMethods.create = create
  ticketMethods.answer = answer
  ticketMethods.get = get
  ticketMethods.getActives = getActives

  return ticketMethods
}