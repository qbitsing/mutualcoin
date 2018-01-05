module.exports = function (states) {
  let data = `
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
  `
  const blocks = {
    active: `active: blocksState(states: ["active"]) {${data}}`,
    inactive: `inactive: blocksState(states: ["inactive"]) {${data}}`,
    running: `running: blocksState(states: ["running"]) {${data}}`,
    paused: `paused: blocksState(states: ["paused"]) {${data}}`,
    cancel: `cancel: blocksState(states: ["cancel"]) {${data}}`,
    finished: `finished: blocksState(states: ["finished"]) {${data}}`
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
  }
  query += '}'
  return { query }
}
