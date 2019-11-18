const updated = require('./hooks/updated')

// Global feathers Hooks
module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [updated()],
    update: [updated()],
    patch: [updated()],
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
