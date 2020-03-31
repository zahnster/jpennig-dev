require('dotenv').config()
const jwt = require('jsonwebtoken')

const teamId = process.env.MUSICKIT_TEAM_ID
const keyId = process.env.MUSICKIT_KEY_ID
const pKey = `-----BEGIN PRIVATE KEY-----\n${process.env.MUSICKIT_KEY}\n-----END PRIVATE KEY-----`

const token = jwt.sign({}, pKey, {
  algorithm: 'ES256',
  expiresIn: '180d',
  issuer: teamId,
  header: {
    alg: 'ES256',
    kid: keyId
  }
})

module.exports = token
