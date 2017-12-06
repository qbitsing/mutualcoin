'use strict'
const mongoose = require('mongoose')
let db

module.exports = function(config) {
    if (!db) {
        db = mongoose.createConnection(config.uri, config.options)
    }
    return db
}
