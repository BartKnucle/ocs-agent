const createModel = require('../../models/device.model')
const { Device } = require('./device.class')
const hooks = require('./device.hooks')

module.exports = (app) => {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  }

  app.use('/device', new Device(options, app))
  const service = app.service('device')

  service.hooks(hooks)
}
