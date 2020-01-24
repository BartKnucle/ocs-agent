const createModel = require('../../models/setup.model')
const { Setup } = require('./class')
const hooks = require('./hooks')

module.exports = (app) => {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    multi: true
  }

  app.use('/api/setup', new Setup(options, app))
  const service = app.service('/api/setup')

  service.hooks(hooks)
}
