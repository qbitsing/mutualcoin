module.exports = (data) => {
  return {
    query: `mutation{
    result: tickerAdd (ticket: {
    subjet: "${data.issue}"
    body: "${data.body}"
    ${data.imageUrl ? 'file: "' + data.imageUrl + '"' : ''}
    date: "${data.date}"
    user: "${data.uuid}"
  }) {
    subjet
    body
    file
    state
    date
    answers {
      body
      file
      date
      from
    }
    user
  }
  }`
  }
}
