const si = require('systeminformation')
const ServiceClass = require('../service.class')

exports.Device = class Device extends ServiceClass {
  constructor (options, app) {
    super(options, app)
    this.remote = '/api/devices'
  }

  /* istanbul ignore next */
  setup (app) {
    app.service('/api/client').on('started', () => {
      this.updateDevice()
      super.setup(app)
    })
  }

  //  Update device informations
  async updateDevice () {
    await si.system()
      .then((data) => {
        this.patch(
          this.app.get('deviceId'),
          data,
          { prefix: 'sys' }
        )
          .catch(() => {
            this.create({
              _id: this.app.get('deviceId'),
              online: true,
              ...data
            },
            { prefix: 'sys' })
          })
      })

    await si.osInfo()
      .then((data) => {
        this.patch(
          this.app.get('deviceId'),
          data,
          { prefix: 'os' }
        )
      })

    this.patch(
      this.app.get('deviceId'),
      { port: this.app.get('port') },
      { prefix: 'cli' }
    )
  }
}
