'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BACKEND_API_URI: '"http://localhost:3000/api/"',
  LOGIN_CALLBACK_URI: '"http://localhost:3000/callback"',
})
