'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BACKEND_API_URI: '"http://localhost:3000/api/"',
  LOGIN_CALLBACK_URI: '"http://localhost:8080/callback"',
  ONESIGNAL_APP_ID: '"8fea93ea-1eb7-47d5-ba69-414b7d343a78"',
  ONESIGNAL_API_KEY: '"YTlmYTdhYTAtNDk0NC00NTcxLTg5NDktYTZjYzI1NDg1ZWIy"'
})
