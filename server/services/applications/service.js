const createModel = require('../../models/applications.model')
const { Applications } = require('./class')
const hooks = require('./hooks')

module.exports = (app) => {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  }

  app.use('/api/applications', new Applications(options, app))
  const service = app.service('/api/applications')

  service.hooks(hooks)
}
