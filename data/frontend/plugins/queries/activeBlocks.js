module.exports = {
  query: `{
    active: blocksState(states: ["active"]) {
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
      name
    }
  }` }
