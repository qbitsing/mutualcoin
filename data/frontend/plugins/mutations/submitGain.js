module.exports = (uuid, earnings) => {
  return { query: `mutation {
      daysInfo: blockEarnings(uuid: "${uuid}", earnings: 
      ${earnings}
    ) {
     
      low
      medium
      high
      day
    
    }
  }`
  }
}
