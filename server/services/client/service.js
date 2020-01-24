const createModel = require('../../models/client.model')
const { Client } = require('./class')
const hooks = require('./hooks')

module.exports = (app) => {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  }

  app.use('/api/client', new Client(options, app))
  const service = app.service('/api/client')

  service.hooks(hooks)
}
