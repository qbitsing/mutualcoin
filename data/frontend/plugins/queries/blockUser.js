module.exports = (block) => {
  return `{
    blocksUsers: blocksUsersBy(propertie:"block", value:"${block}") {
      block
      _block {
        endingDate
        startDate
      }
      user
      _user {
        nickname
      }
      uuid
      amount
      high
      medium
      low
      pays
      last_pay
    }
  }`
}
