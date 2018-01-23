module.exports = (uuid) => {
  return {
    query: `{
  tickets${uuid ? '(user: "' + uuid + '")' : ' '}{
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
