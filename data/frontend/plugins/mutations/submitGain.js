module.exports = (uuid, earnings) => {
  return { query: `mutation {
      blockEarnings(uuid: "${uuid}", earnings: {
      ${earnings}
    }) {
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
  }`
  }
}
