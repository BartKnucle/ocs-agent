const si = require('systeminformation')
const ServiceClass = require('../service.class')

exports.Device = class Device extends ServiceClass {
  constructor (options, app) {
    super(options, app)
    this.remote = 'devices'
  }

  setup (app) {
    app.service('client').on('started', async () => {
      //  Get devices informations
      await si.system()
        .then(async (data) => {
          await this.get(app.get('deviceId'))
            .then(() => {
              this.patch(
                app.get('deviceId'),
                data,
                { prefix: 'sys' }
              )
            })
            .catch(() => {
              this.create({
                _id: app.get('deviceId'),
                ...data
              },
              { prefix: 'sys' })
            })
        })

      si.osInfo()
        .then((data) => {
          this.patch(
            app.get('deviceId'),
            data,
            { prefix: 'os' }
          )
        })
      super.setup(app)
    })
  }
}
