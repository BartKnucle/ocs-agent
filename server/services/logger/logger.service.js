
const createModel = require('../../models/logger.model')
const { Logger } = require('./logger.class')
const hooks = require('./logger.hooks')

module.exports = (app) => {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    multi: true
  }

  app.use('/logger', new Logger(options, app))
  const service = app.service('logger')

  service.hooks(hooks)
}
