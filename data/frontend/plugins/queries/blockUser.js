module.exports = (block) => {
  return `{
    blocksUsers: blocksUsersBy(propertie:"block", value:"88445c1d-fae5-40e3-91f7-fe874df93f82") {
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
