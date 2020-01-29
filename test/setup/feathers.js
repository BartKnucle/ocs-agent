const path = require('path')
const testPath = path.join(require('os').homedir(), '.ocs-agent', 'test')
const feathers = require('@feathersjs/feathers')
const configuration = require('@feathersjs/configuration')
const authentication = require('@/server/services/authentication/service')

const app = feathers()

app.set('homePath', testPath)
app.configure(configuration())
app.configure(authentication)

module.exports = app
