const feathers = require('@feathersjs/feathers')
const configuration = require('@feathersjs/configuration')
const authentication = require('@/server/services/authentication/service')

const app = feathers()
app.configure(configuration())
app.configure(authentication)

module.exports = app
