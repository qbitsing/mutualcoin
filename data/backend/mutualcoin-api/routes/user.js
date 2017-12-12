'use strict'

const debug = require('debug')('mutualcoin:api:routes')
const express = require('express')
const asyncify = require('express-asyncify')
const mutualcoinDB = require('mutualcoin-db')
const config = require('../config')
const { sing } = require('../auth')
const api = asyncify(express.Router())

let db, userModel

api.use('*', async (req, res, next) => {
  if (!db) {
    debug('Conecting and getting the user model in mutualcoin-db module')
    try {
      db = await mutualcoinDB(config.db)
    } catch (error) {
      return next(error)
    }

    userModel = db.user
  }

  next()
})

api.post('/login', async (req, res, next) => {
  debug('A requets has come to /api/user/login')
  const { email, password } = req.body.datas
  const credentials = {
    email,
    password
  }
  console.log(req.body)
  let result

  try {
    result = await userModel.singin(credentials)
  } catch (error) {
    return next(error)
  }

  if (result.login) {
    const sesion = {
      admin: result.user.admin,
      nickname: result.user.nickname,
      uuid: result.user.uuid,
      bch: result.user.bch,
      bchType: result.user.bchType,
      firstName: result.user.firstName,
      lastName: result.user.lastName,
      age: result.user.age,
      birthdate: result.user.birthdate,
      gender: result.user.gender,
      address: result.user.address,
      phone: result.user.phone,
      hobbies: result.user.hobbies,
      codeReferred: result.user.codeReferred
    }
    sing(sesion, config.secret, (error, token) => {
      if (error) {
        return next(error)
      }

      res.status(200).send({
        message: result.message,
        token,
        sesion
      })
    })
  } else {
    res.status(400).send({
      message: result.message
    })
  }
})

api.post('/register', async (req, res, next) => {
  debug('A request has come to /api/user/register')

  const { userToCreate } = req.body
  let userCreated
  try {
    userCreated = await userModel.register(userToCreate)
  } catch (error) {
    return next(error)
  }

  res.send({userCreated})
})

api.put('/update/:uuid', async (req, res, next) => {
  const { uuid } = req.params
  debug(`A request has come to /api/user/update/${uuid}`)
  const { userToUpdate } = req.body
  let userUpdated
  try {
    userUpdated = await userModel.update(uuid, userToUpdate)
  } catch (error) {
    return next(error)
  }

  res.send({ userUpdated })
})

module.exports = api
