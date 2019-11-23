
const createModel = require('../../models/logger.model')
const { Logger } = require('./logger.class')
const hooks = require('./logger.hooks')

module.exports = async (app) => {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  }

  app.use('/logger', new Logger(options, app))
  const service = app.service('logger')

  service.hooks(hooks)

  app.log = (log) => {
    if (log.level >= app.get('logLevel')) {
      service.create(log)
    }
  }
}
