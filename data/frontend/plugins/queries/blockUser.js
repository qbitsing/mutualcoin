module.exports = (block) => {
  return `{
    blocksUsers: blocksUsersBy(propertie:"block", value:"${block}") {
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
