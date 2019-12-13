'use strict'
const path = require('path')
const https = require('https')
const consola = require('consola')
const feathers = require('@feathersjs/feathers')
const socketio = require('@feathersjs/socketio')
const express = require('@feathersjs/express')

const services = require('./services')
const channels = require('./channels')
const certif = require('./certif')

process.env.NODE_CONFIG_DIR = path.join(__dirname, 'config/')

async function start () {
  const app = express(feathers())

  const { Nuxt, Builder } = require('nuxt')

  // Setup nuxt.js
  const config = require('../nuxt.config.js')
  config.rootDir = path.resolve(__dirname, '..')
  config.dev = process.env.NODE_ENV !== 'production'

  const nuxt = new Nuxt(config)
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  const configuration = require('@feathersjs/configuration')
  app.configure(configuration()).use(nuxt.render)

  app.set('homePath', path.join(require('os').homedir(), '.ocs-agent'))
  app.set('dbPath', path.join(app.get('homePath'), app.get('nedb')))
  app.set('cachePath', path.join(app.get('homePath'), app.get('cache')))

  app.configure(socketio())
  app.hooks(require('./app.hooks'))
  app.configure(services)
  app.configure(channels)

  const host = app.get('host')
  const port = app.get('port')
  const certificate = certif()
  const credentials = {
    key: certificate.private, cert: certificate.cert
  }

  const server = https.createServer(credentials, app).listen(port)

  app.setup(server)

  consola.ready({
    message: `Feathers application started on ${host}:${port}`,
    badge: true
  })
}

exports.start = start
