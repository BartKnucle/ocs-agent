const logger = require('./logger')
const device = require('./device')
const interfaces = require('./interfaces')

module.exports = function (app) {
  app.configure(logger)
  app.configure(device)
  app.configure(interfaces)
}
