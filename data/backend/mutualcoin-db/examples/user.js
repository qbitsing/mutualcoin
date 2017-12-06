'use strict'

const mutualcoinDB = require('../')

const config = {
    host: 'ds133136.mlab.com',
    user: 'heroku_wdxc31kk',
    password: 'k0qo9sh9r8bkm9fscvb5h7rfhs',
    db: 'heroku_wdxc31kk',
    port: 33136
}

const newUser = {
    nickname: 'omar',
    email: 'test@test.com',
    bch: 'xxxxxxxxxxx',
    bchType: 'BlockChange',
    codeReferred: 'yyyyyy',
    password: 'omar'
}

const credentials = {
    email: 'test@test.com',
    password: 'omar'
}

mutualcoinDB(config)
.then(db => {
    const { user } = db
    user.register(newUser)
    .then(response => {
        console.log(response)
        }).catch(error => console.error(error.message))

    user.singin(credentials)
        .then(response => {
            console.log(response)
        }).catch(console.error)
}).catch(error => console.error(error.message))
