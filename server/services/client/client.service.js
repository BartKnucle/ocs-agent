const createModel = require('../../models/client.model')
const { Client } = require('./client.class')
const hooks = require('./client.hooks')

module.exports = (app) => {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  }

  app.use('/api/client', new Client(options, app))
  const service = app.service('/api/client')

  service.hooks(hooks)
}
