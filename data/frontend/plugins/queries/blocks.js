module.exports = function (states) {
  const blocks = {
    active: `active: blocksState(states: ["active"]) {
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
    }`,
    inactive: `inactive: blocksState(states: ["inactive"]) {
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
    }`,
    waiting: `waiting: blocksState(states: ["waiting"]) {
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
    }`,
    running: `running: blocksState(states: ["running"]) {
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
    }`,
    paused: `paused: blocksState(states: ["paused"]) {
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
    }`,
    cancel: `cancel: blocksState(states: ["cancel"]) {
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
    }`,
    finished: `finished: blocksState(states: ["finished"]) {
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
  }`
  }
  let query = '{'
  if (Array.isArray(states)) {
    states.forEach(el => {
      query += el === 'active' ? blocks.active : ''
      query += el === 'inactive' ? blocks.inactive : ''
      query += el === 'waiting' ? blocks.waiting : ''
      query += el === 'running' ? blocks.running : ''
      query += el === 'paused' ? blocks.paused : ''
      query += el === 'finished' ? blocks.finished : ''
      query += el === 'cancel' ? blocks.cancel : ''
    })
  } else if (states === 'all') {
    query = query + blocks.active + blocks.inactive + blocks.cancel + blocks.waiting + blocks.running + blocks.paused + blocks.finished
  } else {
    query += states === 'active' ? blocks.active : ''
    query += states === 'inactive' ? blocks.inactive : ''
    query += states === 'waiting' ? blocks.waiting : ''
    query += states === 'running' ? blocks.running : ''
    query += states === 'paused' ? blocks.paused : ''
    query += states === 'finished' ? blocks.finished : ''
    query += states === 'cancel' ? blocks.cancel : ''
  }
  query += '}'
  return { query }
}
