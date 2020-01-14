const ServiceClass = require('../service.class')

exports.Download = class Download extends ServiceClass {
  constructor (options, app) {
    super(options, app)
    this.remote = '/api/devicesdps'
  }

  setup (app) {
    app.service('/api/client').on('started', () => {
      super.setup(app)
    })
  }

  async find(params) {
    return this.app.client.service(this.remote).find(params)
  }
}
