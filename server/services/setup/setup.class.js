const si = require('systeminformation')
const ServiceClass = require('../service.class')

exports.Setup = class Setup extends ServiceClass {
  async setup (app) {
    // Get device ID
    await si.system()
      .then((data) => {
        app.set('deviceId', data.uuid)
      })
    super.setup(app)
  }
}
