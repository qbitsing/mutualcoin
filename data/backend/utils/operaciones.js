'use strict'

const BigNumber = require('bignumber.js')
BigNumber.config({
  EXPONENTIAL_AT: [-20, 20]
})
module.exports = function (str) { 
  let operaciones = str.split(' ')
  let num1, num2, ope
  for (let o of operaciones) {
    if (!num1) {
      num1 = new BigNumber(o)
    } else if (!ope) {
      ope = o
    } else if (!num2) {
      num2 = new BigNumber(o)
      switch (ope) {
        case '+':
          num1 = num1.plus(num2)
          break
        case '-':
          num1 = num1.minus(num2)
          break
        case '*':
          num1 = num1.times(num2)
          break
        case '/':
          num1 =num1.dividedBy(num2)
          break
        default:
          break
      }

      num2 = null
      ope = null
    }

  }
  return num1.toString()
}
