const si = require('systeminformation')
const logger = require('./logger/logger.service')
const client = require('./client/client.service')
const device = require('./device/device.service')
const interfaces = require('./interfaces/interfaces.service')

module.exports = async (app) => {
  await si.system()
    .then(async (data) => {
      app.set('deviceId', data.uuid)
      app.configure(logger)
      app.configure(device)
      app.configure(client)
      app.configure(interfaces)
    })
}
