module.exports = (uuid, to) => {
  return {
    query: ` mutation {
      payGenerated: blockPay (uuid: "${uuid}",to:${to}) {
        user
        app
        red
        trader
        low
        high
        medium
        from
        to
        nickname
        amount
      }
    } `
  }
}
