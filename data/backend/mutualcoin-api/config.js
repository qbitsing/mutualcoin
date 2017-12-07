'use strict'

module.exports = {
  db: {
    host: process.env.DBHOST || 'ds133136.mlab.com',
    user: process.env.DBUSER || 'heroku_wdxc31kk',
    password: process.env.DBPASSWORD || 'k0qo9sh9r8bkm9fscvb5h7rfhs',
    db: process.env.DBNAME || 'heroku_wdxc31kk',
    port: process.env.DBPORT || 33136
  },
  secret: process.env.SECRET || 'mutualcoin'
}
