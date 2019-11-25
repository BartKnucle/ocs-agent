const prefixKey = require('../../hooks/prefixKey')
const dataChanged = require('../../hooks/dataChanged')
const push = require('../../hooks/push')

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [prefixKey()],
    update: [prefixKey(), dataChanged()],
    patch: [prefixKey(), dataChanged()],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [push()],
    update: [push()],
    patch: [push()],
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
