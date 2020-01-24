const ServiceClass = require('../service.class')

exports.Logger = class Logger extends ServiceClass {
  setup (app) {
    app.log = this.log.bind(this)
    app.service('/api/setup').on('started', () => {
      super.setup(app)
    })
  }

  log (log) {
    if (log.level >= this.app.get('logLevel')) {
      return this.create(log)
    }
  }
}
