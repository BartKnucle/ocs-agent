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
    this.app.service('/api/setup').patch(
      this.name,
      {
        started: true
      }
    ).catch(() => {
      this.app.service('/api/setup').create(
        {
          _id: this.name,
          started: true
        }
      )
    })
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
      .catch(() => {
        this.app.service('/api/setup').create(
          {
            _id: this.name,
            started: false
          }
        )
      })
    this.emit('stopped', this.name)
  }
}
