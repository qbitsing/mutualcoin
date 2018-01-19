'use strict'

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
    tickets: (_, { user }) => db.ticket.get(user),
    ticketsActives: (_, { user }) => db.ticket.getActives(user),
    ticketAdd: (_, { ticket }) => db.ticket.create(ticket),
    ticketAnswer: (_, { uuid, respose }) => db.ticket.answer(uuid, respose)
  })
}
