const createModel = require('../../models/interfaces.model')
const { Interfaces } = require('./interfaces.class')
const hooks = require('./interfaces.hooks')

module.exports = (app) => {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  }

  app.use('/interfaces', new Interfaces(options, app))
  const service = app.service('interfaces')

  service.hooks(hooks)
}
