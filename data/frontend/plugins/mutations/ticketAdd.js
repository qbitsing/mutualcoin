module.exports = (data) => {
  return {
    query: `mutation{
    result: ticketAdd (ticket: {
    subjet: "${data.issue}"
    body: "${data.body}"
    ${data.imageUrl ? 'file: "' + data.imageUrl + '"' : ''}
    date: "${data.date}"
    user: "${data.uuid}"
    }) {
      subjet
      id
      state
      answers {
        body
        file
        date
        from
      }
      user
      _user {
        nickname
      }
    }
  }`
  }
}
