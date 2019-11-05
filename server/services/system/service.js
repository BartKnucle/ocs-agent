// Initializes the `users` service on path `/users`
const createService = require('feathers-nedb')
const si = require('systeminformation')
const createModel = require('../../models/system.model')
const hooks = require('./hooks')

class System {
  constructor (app, service) {
    this.app = app
    this.service = service
  }

  init () {
    si.system()
      .then((data) => {
        Object.keys(data).map(async (k) => {
          if (data[k]) {
            await this.service.update(
              'sys.' + k,
              { data: data[k] },
              { nedb: { upsert: true } }
            )
          }
        })
      })
      .catch((err) => {
        return err
      })

    si.osInfo()
      .then((data) => {
        Object.keys(data).map(async (k) => {
          if (data[k]) {
            await this.service.update(
              'os.' + k,
              { data: data[k] },
              { nedb: { upsert: true } }
            )
          }
        })
      })
      .catch((err) => {
        return err
      })
  }
}

module.exports = function (app) {
  const Model = createModel(app)
  // const paginate = app.get('paginate')

  const options = {
    Model
  }

  // Initialize our service with any options it requires
  app.use('/system', createService(options))

  // Get our initialized service so that we can register hooks
  const service = app.service('system')

  service.hooks(hooks)

  app.systemService = new System(app, service)
  app.systemService.init()
}
