const logger = require('./logger')
const client = require('./client')
const device = require('./device/device.service')
const interfaces = require('./interfaces/interfaces.service')

module.exports = async (app) => {
  app.configure(logger)
  await app.configure(device)
  app.configure(client)
  app.configure(interfaces)
}
