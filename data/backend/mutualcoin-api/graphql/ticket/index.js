'use strict'

const socket = require('../../io/emit-message')

const answer = `
  body: String
  file: String
  date: String
  from: String
`
module.exports = {
  Ticket: `
    type Ticket {
      subjet: String
      body: String
      file: String
      state: String
      date: String
      answers: [Answer]
      user: String
    }

    type Answer {
      ${answer}
    }

    input Response {
      ${answer}
    }

    input newTicket {
      subjet: String
      body: String
      file: String
      date: String
      user: String
    }
  `,
  Query: (db) => ({
    tickets: (_, { user }, context) => db.ticket.get(user, context.user),
    ticketsActives: (_, { user }, context) => db.ticket.getActives(user, context.user),
    ticketAdd: async (_, { ticket }) => {
      let result
      try {
        result = await db.ticket.create(ticket)
      } catch (error) {
        throw error
      }
      if (result) {
        socket({
          payload: 'ticket/add',
          body: result
        })
      }
      return result
    },
    ticketAnswer: async (_, { uuid, respose }, { user }) => {
      let result
      try {
        result = await db.ticket.answer(uuid, respose, user)
      } catch (error) {
        throw error
      }
      if (result) {
        socket({
          payload: 'ticket/response',
          body: result
        })
      }
      return result
    }
  })
}
