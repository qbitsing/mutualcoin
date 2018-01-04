module.exports = {
  query: `{
    blocks { 
      amount
      amountLeft
      _coin {
        name
      }
      uuid
      weeks
      startDate
      endingDate
      state
      runDays
      daysInfo
      last_pay
      uuid
      days
    }
  }` }
