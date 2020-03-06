const dataChanged = require('../../hooks/dataChanged')

const checkInstallation = (options = {}) => {
  return (context) => {
    switch (context.result.status) {
      case 'Installing':
        context.service.install(context.result)
        break
      case 'Removing':
        context.service.unInstall(context.result)
        break
      default:
        break
    }
    return context
  }
}

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [dataChanged()],
    patch: [dataChanged()],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [checkInstallation()],
    update: [checkInstallation()],
    patch: [checkInstallation()],
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
