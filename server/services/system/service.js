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

    this.device = {
      _id: sys.uuid,
      hostname: os.hostname,
      distro: os.distro
    }

    this.service.patch(
      'sys.uuid',
      { data: this.device._id },
      { nedb: { upsert: true } }
    ).catch(() => {
      this.service.create({
        _id: 'sys.uuid',
        data: this.device._id
      })
    })

    this.service.patch(
      'os.hostname',
      { data: this.device.hostname },
      { nedb: { upsert: true } }
    ).catch(() => {
      this.service.create({
        _id: 'os.hostname',
        data: this.device.hostname
      })
    })

    this.service.patch(
      'os.distro',
      { data: this.device.distro },
      { nedb: { upsert: true } }
    ).catch(() => {
      this.service.create({
        _id: 'os.distro',
        data: this.device.distro
      })
    })

    this.push()
  }

  //  Push data to server
  push () {
    this.server.create(this.device)
      .catch(() => {
        this.server.patch(this.device._id, this.device)
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
