module.exports = (uuid) => {
  return {
    query: `mutation {
      blocksUser: blockMakePay (uuid: "${uuid}") {
        block
        user
        _user {
          nickname
        }
        uuid
        amount
        high
        medium
        low
        pays {
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
        last_pay
      }
    }`
  }
}
