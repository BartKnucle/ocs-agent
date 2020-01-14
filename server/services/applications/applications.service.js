const createModel = require('../../models/applications.model')
const { Applications } = require('./applications.class')
const hooks = require('./applications.hooks')

module.exports = (app) => {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  }

  app.use('/api/applications', new Applications(options, app))
  const service = app.service('/api/applications')

  service.hooks(hooks)
}
