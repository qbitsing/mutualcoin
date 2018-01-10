module.exports = (data) => {
  return {
    query: `mutation {
    result: blockAdd(block: {
    amount: ${data.amount}
    coin: "${data.coin}"
    weeks: ${data.weeks}
    ${data.user ? 'user: "' + data.user + '"' : ''}
  }) {
    uuid
    name
    weeks
    amount
    amountLeft
    state
    _coin{
      name
    }
    endingDate
    startDate
    last_pay
    daysInfo {
      day
      high
      medium
      low
    }
    runDays
  }
    }`
  }
}
