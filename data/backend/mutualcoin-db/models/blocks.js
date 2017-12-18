'use strict'

const { Schema } = require('mongoose')

const blockSchema = new Schema({
    amount: Number,
    amountLeft: Number,
    coin: String,
    uuid: String,
    endingDate: Date,
    startDate: Date,
    weeks: Number,
    user: String,
    state: {
        type: String,
        enum: [
            'paused',
            'active',
            'finished',
            'cancel',
            'inactive',
            'running',
            'waiting'
        ],
        default: 'inactive'
    },
    runDays: Number
})

module.exports = blockSchema
