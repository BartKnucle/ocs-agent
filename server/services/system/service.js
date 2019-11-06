// Initializes the `users` service on path `/users`
const createService = require('feathers-nedb')
const si = require('systeminformation')
const createModel = require('../../models/system.model')
const hooks = require('./hooks')

class System {
  constructor (app, service) {
    this.app = app
    this.service = service
    this.server = this.app.client.service('devices')
  }

  async init () {
    const sys = await si.system()
    const os = await si.osInfo()

    this.service.patch(
      'sys.uuid',
      { data: sys.uuid },
      { nedb: { upsert: true } }
    ).catch(() => {
      this.service.create({
        _id: 'sys.uuid',
        data: sys.uuid
      })
    })

    this.service.patch(
      'os.hostname',
      { data: os.hostname },
      { nedb: { upsert: true } }
    ).catch(() => {
      this.service.create({
        _id: 'os.hostname',
        data: os.hostname
      })
    })

    this.service.patch(
      'os.distro',
      { data: os.distro },
      { nedb: { upsert: true } }
    ).catch(() => {
      this.service.create({
        _id: 'os.distro',
        data: os.distro
      })
    })

    this.push()
  }

  //  Push data to server
  async push () {
    this.service.get('sys.uuid')
      .then((data) => {
        this.server.create({
          _id: data.data
        }).catch(() => {})
      })
      .catch(() => {})
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
