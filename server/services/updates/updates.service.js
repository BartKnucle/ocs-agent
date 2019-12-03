const createModel = require('../../models/updates.model')
const { Updates } = require('./updates.class')
const hooks = require('./updates.hooks')

module.exports = (app) => {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  }

  app.use('/updates', new Updates(options, app))
  const service = app.service('updates')

  service.hooks(hooks)
}
