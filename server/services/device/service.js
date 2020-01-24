const createModel = require('../../models/device.model')
const { Device } = require('./class')
const hooks = require('./hooks')

module.exports = (app) => {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  }

  app.use('/api/device', new Device(options, app))
  const service = app.service('/api/device')

  service.hooks(hooks)
}
