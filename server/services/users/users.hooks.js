const { hashPassword } = require('@feathersjs/authentication-local').hooks

const setOnline = (options = {}) => {
  return (context) => {
    if (context.app.service('/api/devices')) {
      if (context.id !== undefined) {
        context.app.service('/api/devices')
        .create({ _id: context.id, online: context.data.online })
        .catch(() => {
          context.app.service('/api/devices').patch(
            context.id,
            { online: context.data.online }
          )
        })
      }
    }
    return context
  }
}

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [setOnline(), hashPassword('password')],
    update: [setOnline(), hashPassword('password')],
    patch: [setOnline(), hashPassword('password')],
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
