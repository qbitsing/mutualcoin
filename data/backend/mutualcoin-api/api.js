'use stric'

const express = require('express')
const user = require('./routes/user')
const asyncify = require('express-asyncify')
const api = asyncify(express.Router())

api.use('/user', user)

module.exports = api
