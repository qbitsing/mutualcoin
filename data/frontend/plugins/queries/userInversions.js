module.exports = function (uuid) {
  return { query: `{
    blocksUsersBy(propertie: "user", value: "${uuid}") {
    _block {
      amount
      amountLeft
      name
      _coin {
        acronym
        name
      }
      startDate
      endingDate
      weeks
      state
      runDays
      daysInfo {
        day
        high
        medium
        low
      }
    }
    uuid
    amount
    high
    medium
    low
    pays {
      app
      user
      red
      trader
      from
      to
    }
  }
}` }
}
