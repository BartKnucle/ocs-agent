const setup = require('./setup/service.js')
const system = require('./system/service.js')
const network = require('./network/service.js')

module.exports = async function (app) {
  await app.configure(setup)
  app.configure(system)
  app.configure(network)
}
