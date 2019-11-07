const system = require('./system/service.js')
const interfaces = require('./interfaces/service.js')

module.exports = function (app) {
  app.configure(system)
  app.configure(interfaces)
}
