'use strict'

const decimal = require('decimal')
const $user = 40
const $red = 10
const $app = 20
const $trader = 30

function calculatePercentages(daysInfo, i, obj) { 
  if (i < daysInfo.length) { 
    obj.$low = decimal(''+obj.$low).add(''+daysInfo[i].low).toNumber()
    obj.$medium = decimal(''+obj.$medium).add(''+daysInfo[i].medium).toNumber()
    obj.$high = decimal(''+obj.$high).add(''+daysInfo[i].high).toNumber()
    i++
    return calculatePercentages(daysInfo, i, obj)
  }

  return obj
}
module.exports = function (hasta, investments) { 
  const pays = []

  for (let investment of investments) { 
    let { _block, last_pay, low, medium, high, amount } = investment
    let { daysInfo } = _block, pay

    let _low = decimal(''+amount).mul(''+low).div('100')
    let _medium = decimal(''+amount).mul(''+medium).div('100')
    let _high = decimal(''+amount).mul(''+high).div('100')
    
    daysInfo = daysInfo.filter(i => i.day > last_pay && i.day <= hasta)
    let { $low, $medium, $high } = calculatePercentages(daysInfo, 0, { $low: 0, $medium: 0, $high: 0 })
    
    let $$low = decimal(''+_low).mul(''+$low).div('100').toNumber()
    let $$medium = decimal(''+_medium).mul(''+$medium).div('100').toNumber()
    let $$high = decimal('' + _high).mul('' + $high).div('100').toNumber()
    let $$pay = decimal('' + $$low).add('' + $$medium).add('' + $$high).toNumber()
    
    pay = {
      user: decimal(''+$$pay).mul(''+$user).div('100').toNumber(),
      app: decimal(''+$$pay).mul(''+$app).div('100').toNumber(),
      red: decimal(''+$$pay).mul(''+$red).div('100').toNumber(),
      trader: decimal(''+$$pay).mul(''+$trader).div('100').toNumber()
    }

    if ($$pay > 0) { 
      pay.pay = true
    }

    pays.push(pay)
  }

  return pays
}