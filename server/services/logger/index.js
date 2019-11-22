const Service = require('../service')

class Logger extends Service {
  constructor (app) {
    super(app)
    this.app = app
    this.loglevel = this.app.get('logLevel')
  }
  init () {
    super.init()
  }

  log (log) {
    if (log.level >= this.loglevel) {
      log.service = this.name
      this.app.logger.save(log)
    }
  }

  save (log) {
    this.data[new Date().valueOf().toString()] = log
  }
}

module.exports = function (app) {
  const logger = new Logger(app)
  app.log = logger.log
  logger.init()
}
