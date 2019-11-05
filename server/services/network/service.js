// Initializes the `users` service on path `/users`
const createService = require('feathers-nedb')
const createModel = require('../../models/network.model')
const hooks = require('./hooks')
const si = require('systeminformation')

module.exports = function (app) {
  const Model = createModel(app)
  const paginate = app.get('paginate')

  const options = {
    Model
  }

  // Initialize our service with any options it requires
  app.use('/network', createService(options))

  // Get our initialized service so that we can register hooks
  const service = app.service('network')

  service.hooks(hooks)

  const updateNetwork = () => {
    si.networkInterfaces()
      .then((data) => {
        Object.keys(data).map((k) => {
          if (data[k]) {
            service.update(
              data[k].iface,
              { data: data[k] },
              { nedb: { upsert: true }}
            )
          }
        })
      })
      .catch((err) => {
        return err
      })
  }

  setInterval(updateNetwork, 1000)
}
