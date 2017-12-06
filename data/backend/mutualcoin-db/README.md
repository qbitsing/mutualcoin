# MutualCoin DB

DataBase module for the platform mutualcoin.com

## Usage "Init de module"

``` js

const mutualcoinDB = require('mutualcoin-db')

mutualcoinDB(setup)
    .then(db => {
        const { user } = db
        user.register(newUser) // this function is async
    }).catch(handleError)

```