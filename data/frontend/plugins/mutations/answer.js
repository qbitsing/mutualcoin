module.exports = (data) => {
  return {
    query: `mutation {
      ticketAnswer(uuid: "${data.id}", response: {
        body: "${data.body}"
        from: "${data.from}"
        date: "${data.date}"
      }) {
        answers {
          body
        }
      }
    }`
  }
}
