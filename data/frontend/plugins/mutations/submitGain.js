module.exports = (uuid, earnings) => {
  return { query: `
    mutation {
      daysInfo: blockEarnings(uuid: "${uuid}", earnings: ${earnings.split('"').join('')}){
        day
        low
        high
        medium
      }
    }
  `
  }
}
