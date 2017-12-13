'use strict'

const Schema = require('mongoose').Schema

const conisSchema = new Schema({
    name: String,
    acronym: String,
    uuid: {
        type: String,
        unique: true,
        require: true
    }
})

module.exports = conisSchema
