import feathersClient, {
  makeServicePlugin,
  BaseModel
} from '../apis/local'

const serviceName = 'system'

// Extend the base class
class System extends BaseModel {
  static modelName = serviceName
}

const servicePlugin = makeServicePlugin({
  Model: System,
  service: feathersClient.service(serviceName),
  serviceName
})

// Optionally add service-level hooks, here:
feathersClient.service(serviceName).hooks({
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
})

export default servicePlugin
