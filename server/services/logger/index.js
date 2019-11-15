const Service = require('../service')

class Logger extends Service {
  constructor (app) {
    super(app)
    this.hooks = require('./hooks')
  }

  init () {
    super.init()
  }

  log (log) {
    if (log.level >= this.app.get('logLevel')) {
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
  logger.init()
}
