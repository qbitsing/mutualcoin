'use strict'

const { Schema } = require('mongoose')

const blockUserSchema = new Schema({
    block: String,
    user: String,
    amount: Number,
    high: Number,
    medium: Number,
    low: Number,
    valid: Boolean
})

module.exports = blockUserSchema
