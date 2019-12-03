const createModel = require('../../models/software.model')
const { Software } = require('./software.class')
const hooks = require('./software.hooks')

module.exports = (app) => {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  }

  app.use('/software', new Software(options, app))
  const service = app.service('software')

  service.hooks(hooks)
}
