const system = require('./system/service.js')
const network = require('./network/service.js')

module.exports = async function (app) {
  app.configure(system)
  app.configure(network)
}
