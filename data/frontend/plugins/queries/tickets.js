module.exports = (uuid) => {
  return {
    query: `{
  tickets${uuid ? '(user: "' + uuid + '")' : ' '}{
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
