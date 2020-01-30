const fs = require('fs')
const path = require('path')
const testPath = path.join(require('os').homedir(), '.ocs-agent', 'test')
const feathers = require('@feathersjs/feathers')
const configuration = require('@feathersjs/configuration')
const authentication = require('@/server/services/authentication/service')
const socketio = require('@feathersjs/socketio')
const express = require('@feathersjs/express')

//  fs.rmdirSync(path.join(require('os').homedir(), '.ocs-agent', 'test'), { recursive: true })

const app = express(feathers())
app.configure(socketio())
// Parse HTTP JSON bodies
app.use(express.json())
// Parse URL-encoded params
app.use(express.urlencoded({ extended: true }))
// Add REST API support
app.configure(express.rest())

app.set('homePath', testPath)
app.configure(configuration())
app.configure(authentication)

module.exports = app
