const logger = require('./logger')
const device = require('./device')
const interfaces = require('./interfaces')

module.exports = async (app) => {
  app.configure(logger)
  await app.configure(device)
  app.configure(interfaces)
}
