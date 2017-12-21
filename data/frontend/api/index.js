const express = require('express')
const axios = require('axios')

// Create express router
const router = express.Router()

// Transform req & res to have the same API as express
// So we can use res.status() & res.json()
var app = express()
router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req
  next()
})

// Add POST - /api/login
router.post('/login', (req, res) => {
  const { datas } = req.body
  axios.post('http://localhost:3300/api/user/login', { datas })
    .then(r => {
      req.session.authToken = r.data.token
      req.session.authUser = r.data.sesion
      return res.json(r.data)
    })
    .catch(e => res.status(401).json({msg: e.message}))
})

// Add POST - /api/logout
router.post('/logout', (req, res) => {
  delete req.session.authToken
  delete req.session.authUser
  res.json({ ok: true })
})

// Export the server middleware
module.exports = {
  path: '/api',
  handler: router
}
