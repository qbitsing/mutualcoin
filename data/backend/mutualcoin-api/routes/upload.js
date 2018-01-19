'use strict'

const { v4 } = require('uuid')
const fs = require('fs')
const path = require('path')
const domain = process.env.DOMAIN || 'http://localhost'
const port = process.env.port || '3300'
const api = require('express').Router()

const get = str => str.split(/image/)[1].split(/;/)[0].replace('/', '.')

api.post('/', (req, res) => {
  const { base64 } = req
  const name = v4()
  const image = base64.split(';base64,').pop()
  const extencion = get(base64)

  fs.writeFile(path.join(
      __dirname,
      '../',
      `${name}${extencion}`
    ),
    image,
    { encoding: 'base64' },
    (err) => {
      if (err) {
        res.status(500).send({
          error: err.message
        })

        res.send({
          name: `${domain}:${port}/uploads/${name}${extencion}`
        })
      }
    }
  )
})

module.exports = api
