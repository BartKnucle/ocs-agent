const dataChanged = require('../../hooks/dataChanged')

const install = (options = {}) => {
  return (context) => {
    if (context.data.status === 'Installing') {
      context.service.install(context.id)
    }
    return context
  }
}

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [install()],
    update: [install(), dataChanged()],
    patch: [install(), dataChanged()],
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
