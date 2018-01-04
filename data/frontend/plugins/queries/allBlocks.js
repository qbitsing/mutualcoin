module.exports = {
  query: `{
   active: blocksState(states: ["active"]) {
      amount
      amountLeft
      _coin {
        name
      }
      uuid
    user {
        uuid
        email
      }
      weeks
      state
      uuid
      days
      name
    }
  inactive: blocksState(states: ["inactive"]) {
      amount
      amountLeft
      _coin {
        name
      }
      uuid
    user {
        uuid
        email
      }
      weeks
      state
      uuid
      days
      name
  }
  waiting: blocksState(states: ["waiting"]) {
      amount
      amountLeft
      _coin {
        name
      }
      uuid
  user {
        uuid
        email
      }
      weeks
      state
      uuid
      days
      name
  }
  running: blocksState(states: ["running"]) {
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
      user{
         uuid
        email
      }
      name
    startDate
    runDays
    daysInfo
    last_pay
  }
  paused: blocksState(states: ["paused"]) {
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
      user{
         uuid
        email
      }
      name
    startDate
    runDays
    daysInfo
    last_pay
  }
  cancel: blocksState(states: ["cancel"]) {
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
      user{
         uuid
        email
      }
      name
    endingDate
    startDate
    runDays
    daysInfo
    last_pay
  }
  finished: blocksState(states: ["finished"]) {
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
      user{
         uuid
        email
      }
      name
    endingDate
    startDate
    runDays
    daysInfo
    last_pay
  }
  }` }
