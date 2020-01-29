const dataChanged = require('../../hooks/dataChanged')

const updateDevice = (options = {}) => {
  return (context) => {
    // If the interface is the default one, we update the device
    if (context.result.default) {
      context.app.service('/api/device').patch(
        context.app.get('deviceId'),
        {
          ip4: context.result.ip4,
          ip4_subnet: context.result.ip4_subnet,
          ip6_subnet: context.result.ip6_subnet,
          gatewayV4: context.result.gateway
        },
        { prefix: 'net' }
      )
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
    create: [updateDevice()],
    update: [updateDevice()],
    patch: [updateDevice()],
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
