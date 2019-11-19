const path = require('path')
const equal = require('fast-deep-equal')
const createService = require('feathers-nedb')
const NeDB = require('nedb')

module.exports = class Service {
  constructor (app) {
    this.app = app
    this.name = this.constructor.name.toLowerCase()
    this.app[this.name] = this
    this.log = app.logger.log
    this.multi = true

    this.hooks = {
      before: {
        all: [],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: []
      },

      after: {
        all: [],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: []
      },

      error: {
        all: [],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: []
      }
    }

    //  Default model
    this.model = new NeDB({
      filename: path.join(this.app.get('nedb'), this.name + '.db'),
      autoload: true
    })

    // Proxy for data (trigers DB updates)
    this.data = new Proxy(
      {},
      {
        set: this.onDataUpdate.bind(this),
        deleteProperty: this.onDataDelete.bind(this)
      }
    )
  }

  init () {
    const options = {
      Model: this.model,
      multi: this.multi
    }

    // Initialize our service with any options it requires
    this.app.use('/' + this.name, createService(options))

    // Get our initialized service so that we can register hooks
    this.service = this.app.service(this.name)

    this.service.hooks(this.hooks)

    // If we what data to be updated over time
    if (this.update) {
      setInterval(this.fill.bind(this), this.update)
    } else {
      this.fill()
    }
  }

  // Fill data from system
  fill () {}

  onDataUpdate (target, key, value) {
    if (!equal(target[key], value)) {
      this.patch(target, key, value)
    }
    target[key] = value
    return true
  }

  onDataDelete (target, key) {
    this.delete(target, key)
    delete target[key]
    return true
  }

  // Patch data to database
  patch (target, key, value) {
    this.service.patch(
      key,
      {
        data: value
      },
      { nedb: { upsert: true } }
    ).catch(() => {
      this.service.create({
        _id: key,
        data: value
      })
    })

    this.push()
  }

  // Delete value from db
  delete (target, key) {
    this.service.remove(key)
    this.push()
  }

  // Push data to server
  push () {}
}
