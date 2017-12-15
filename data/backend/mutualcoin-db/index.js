'use strict'

const defaulst = require('defaults')
const connectDB = require('./connect-data-base')
const user = require('./controllers/users')
const coin = require('./controllers/coins')
const block = require('./controllers/blocks')
const blockUser = require('./controllers/block-user')

module.exports = async function(config) {
    // configuramos la configuracion por defecto
    config = defaulst(config, {
        host: 'localhost',
        user: 'qbits',
        password: 'qbits',
        db: 'mutualcoin',
        port: 27017,
        options: {
            useMongoClient: true,
            autoIndex: true, // Don't build indexes
            reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
            reconnectInterval: 500, // Reconnect every 500ms
            poolSize: 10, // Maintain up to 10 socket connections
            // If not connected, return errors immediately rather than waiting for reconnect
            bufferMaxEntries: 0
        }
    })

    const connectConfig = {}

    connectConfig.uri = `mongodb://${config.user}:${config.password}@${config.host}:${config.port}/${config.db}`
    connectConfig.options = config.options

    const db = await connectDB(connectConfig)

    return {
        user : user(db),
        coin: coin(db),
        block: block(db),
        blockUser: blockUser(db)
    }
}
