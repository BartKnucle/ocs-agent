const createModel = require('../../models/download.model')
const { Download } = require('./download.class')
const hooks = require('./download.hooks')

module.exports = (app) => {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  }

  app.use('/api/download', new Download(options, app))
  const service = app.service('/api/download')

  service.hooks(hooks)
}
