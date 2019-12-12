const { Service } = require('feathers-nedb')

module.exports = class ServiceClass extends Service {
  constructor (options, app) {
    super(options, app)
    this.name = this.constructor.name.toLowerCase()
  }

  setup (app) {
    this.app = app
    this.started()
  }

  // Service started event
  started () {
    //  Set the setup api informations
    this.app.service('/api/setup').patch(
      this.name,
      {
        started: true
      }
    )
    this.emit('started', this.name)
  }

  // Service stopped event
  stopped () {
    //  Set the setup api informations
    this.app.service('/api/setup').patch(
      this.name,
      {
        started: false
      }
    )
    this.emit('stopped', this.name)
  }
}
