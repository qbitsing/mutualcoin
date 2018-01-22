'use strict'

const axios = require('./axios')
const decimal = require('decimal')
const mate = require('./operaciones')
const $user = 40
const $red = 10
const $app = 20
const $trader = 30

function calculatePercentages (daysInfo, i, obj) {
  if (i < daysInfo.length) {
    mate(`${obj.$low} + ${daysInfo[i].low}`)
    obj.$low = mate(`${obj.$low} + ${daysInfo[i].low}`)
    obj.$medium = mate(`${obj.$medium} + ${daysInfo[i].medium}`)
    obj.$high = mate(`${obj.$high} + ${daysInfo[i].high}`)
    i++
    return calculatePercentages(daysInfo, i, obj)
  }

  return obj
}
module.exports = async function (hasta, uuid) {
  let investments, response
  try {
    response = await axios(uuid)
  } catch (error) {
    throw error
  }
  investments = response.data.blocksUsersBy
  const pays = []
  hasta = parseInt(hasta)
  investments = investments.map(investment => {
    let { _block, last_pay, low, medium, high, amount, _user } = investment
    let { daysInfo } = _block, pay
    last_pay = last_pay || 0

    let _low = mate(`${amount} * ${low} / 100`)
    let _medium = mate(`${amount} * ${medium} / 100`)
    let _high = mate(`${amount} * ${high} / 100`)

    daysInfo = daysInfo.filter(i => i.day > last_pay && i.day <= hasta)
    if (daysInfo.length <= 0) {
      throw new Error('bad request:')
    }
    let { $low, $medium, $high } = calculatePercentages(daysInfo, 0, { $low: 0, $medium: 0, $high: 0 })

    let $$low = mate(`${_low} * ${$low} / 100`)
    let $$medium = mate(`${_medium} * ${$medium} / 100`)
    let $$high = mate(`${_high} * ${$high} / 100`)
    let $$pay = mate(`${$$low} + ${$$medium} + ${$$high}`)

    pay = {
      user: mate(`${$$pay} * ${$user} / 100`),
      app: mate(`${$$pay} * ${$app} / 100`),
      red: mate(`${$$pay} * ${$red} / 100`),
      trader: mate(`${$$pay} * ${$trader} / 100`),
      from: daysInfo[0].day,
      to: hasta,
      nickname: _user.nickname,
      amount,
      low: $$low,
      high: $$high,
      medium: $$medium
    }

    if ($$pay > 0) {
      pay.pay = true
      investment.pays.push(pay)
      investment.last_pay = hasta
    }

    pays.push(pay)
    return investment
  })

  return { pays, investments, to: hasta }
}
