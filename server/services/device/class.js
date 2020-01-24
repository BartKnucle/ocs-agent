const si = require('systeminformation')
const ServiceClass = require('../service.class')

exports.Device = class Device extends ServiceClass {
  constructor (options, app) {
    super(options, app)
    this.remote = '/api/devices'
  }

  setup (app) {
    app.service('/api/client').on('started', async () => {
      //  Get devices informations
      await si.system()
        .then((data) => {
          this.patch(
            app.get('deviceId'),
            data,
            { prefix: 'sys' }
          )
            .catch(() => {
              this.create({
                _id: app.get('deviceId'),
                online: true,
                ...data
              },
              { prefix: 'sys' })
            })
        })

      await si.osInfo()
        .then((data) => {
          this.patch(
            app.get('deviceId'),
            data,
            { prefix: 'os' }
          )
        })

      this.patch(
        app.get('deviceId'),
        { port: app.get('port') },
        { prefix: 'cli' }
      )

      super.setup(app)
    })
  }
}
