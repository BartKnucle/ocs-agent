const device = require('./device')
const interfaces = require('./interfaces')

module.exports = function (app) {
  app.configure(device)
  app.configure(interfaces)
}
