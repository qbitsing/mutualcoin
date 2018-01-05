module.exports = function (uuid) {
  return { query: `{
    blocksUsersBy(propertie: "block", value: "${uuid}") {
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
    amount
    high
    medium
    low
    pays
  }
}` }
}
