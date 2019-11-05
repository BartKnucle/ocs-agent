// Initializes the `users` service on path `/users`
const createService = require('feathers-nedb')
const createModel = require('../../models/setup.model')
const hooks = require('./hooks')

class Setup {
  constructor(app, service) {
    this.app = app
    this.service = service
  }

  // First data initialisation
  async init() {
    if (! await this.initialized()) {
      await this.service.create({ _id: 'setup.init', data: true })
    }
  }

  // Is setup initialized
  async initialized() {
    return this.service.get('setup.init').then((data) => {
      return data
    }).catch(err => {
      return false
    })
  }

  //Clear the application data
  async clear() {
    await this.service.update('setup.init', { data: false }, { nedb: { upsert: true }})
  }

  //Reset the application data
  async reset() {
    await this.clear()
    await this.init()
  }
}

module.exports = async function (app) {
  const Model = createModel(app)
  const paginate = app.get('paginate')

  const options = {
    Model
  }

  // Initialize our service with any options it requires
  app.use('setup', createService(options))

  // Get our initialized service so that we can register hooks
  const service = app.service('setup')

  service.hooks(hooks)

  let setup = new Setup(app, service)
  await setup.init()
}
