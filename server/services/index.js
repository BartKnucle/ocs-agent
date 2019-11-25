const setup = require('./setup/setup.service')
const logger = require('./logger/logger.service')
const client = require('./client/client.service')
const device = require('./device/device.service')
const interfaces = require('./interfaces/interfaces.service')

module.exports = (app) => {
  app.configure(setup)
  app.configure(logger)
  app.configure(client)
  app.configure(device)
  app.configure(interfaces)
}
