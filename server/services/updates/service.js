const createModel = require('../../models/updates.model')
const { Updates } = require('./class')
const hooks = require('./hooks')

module.exports = (app) => {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  }

  app.use('/api/updates', new Updates(options, app))
  const service = app.service('/api/updates')

  service.hooks(hooks)
}
