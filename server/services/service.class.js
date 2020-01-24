const { Service } = require('feathers-nedb')

module.exports = class ServiceClass extends Service {
  constructor (options, app) {
    super(options, app)
    this.app = app
    this.name = this.constructor.name.toLowerCase()
  }

  setup () {
    this.started()
  }

  // Service started event
  started () {
    //  Set the setup api informations
    return this.app.service('/api/setup').patch(
      this.name,
      {
        started: true
      }
    )
      .then(() => {
        this.emit('started', this.name)
      })
      .catch(() => {
        return this.app.service('/api/setup').create(
          {
            _id: this.name,
            started: true
          }
        ).then(() => {
          this.emit('started', this.name)
        })
      })
  }

  // Service stopped event
  stopped () {
    //  Set the setup api informations
    return this.app.service('/api/setup').patch(
      this.name,
      {
        started: false
      }
    )
      .then(() => {
        this.emit('stopped', this.name)
      })
      .catch(() => {
        return this.app.service('/api/setup').create(
          {
            _id: this.name,
            started: false
          }
        ).then(() => {
          this.emit('stopped', this.name)
        })
      })
  }
}
