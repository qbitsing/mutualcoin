export default (uuid) => {
  return {
    query: `{
    block(uuid: "${uuid}") {
      amount
      amountLeft
      _coin {
        name
      }
      uuid
      weeks
      state
      uuid
      days
      user
      name
      endingDate
      startDate
      runDays
      daysInfo {
        low
        medium
        high
        day
      }
      last_pay
    }
  }
    `
  }
}
