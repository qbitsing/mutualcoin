module.exports = (data) => {
  return { query: `mutation {
  inversion: blockUserAdd(blockUser: {
    amount: ${data.amount}
    block: "${data.block}"
    user: "${data.user}"
    high: ${data.high}
    medium: ${data.medium}
    low: ${data.low}
  }) {
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
       low
       medium
       high
       }
     }
     uuid
     amount
     high
     medium
     low
     pays
      }
  }`
  }
}
