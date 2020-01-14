const setup = require('./setup/setup.service')
const logger = require('./logger/logger.service')
const client = require('./client/client.service')
const device = require('./device/device.service')
const interfaces = require('./interfaces/interfaces.service')
const applications = require('./applications/applications.service')
const updates = require('./updates/updates.service')
const download = require('./download/download.service')

module.exports = (app) => {
  app.configure(setup)
  app.configure(logger)
  app.configure(device)
  app.configure(interfaces)
  app.configure(applications)
  app.configure(updates)
  app.configure(download)
  app.configure(client)
}
