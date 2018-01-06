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
      daysInfo
    }
    uuid
    amount
    high
    medium
    low
    pays
  }
}` }
}
