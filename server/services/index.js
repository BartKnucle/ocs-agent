const logger = require('./logger')
const client = require('./client')
const device = require('./device')
const interfaces = require('./interfaces')

module.exports = async (app) => {
  app.configure(logger)
  await app.configure(client)
  app.configure(device)
  app.configure(interfaces)
}
