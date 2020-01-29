const createModel = require('../../models/interfaces.model')
const { Interfaces } = require('./class')
const hooks = require('./hooks')

module.exports = (app) => {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    multi: true
  }

  app.use('/api/interfaces', new Interfaces(options, app))
  const service = app.service('/api/interfaces')

  service.hooks(hooks)
}
