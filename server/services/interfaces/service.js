// Initializes the `users` service on path `/users`
const createService = require('feathers-nedb')
const si = require('systeminformation')
const createModel = require('../../models/interfaces.model')
const hooks = require('./hooks')

class Interfaces {
  constructor (app, service) {
    this.app = app
    this.service = service
  }

  init () {
    const updateInterfaces = async () => {
      const defaultInterfaceId = await si.networkInterfaceDefault()
      si.networkInterfaces()
        .then(async (data) => {
          //  Deactivate network cards without remove
          const oldIfaces = await this.service.find()
          oldIfaces.forEach((iface) => {
            if (!data.find(x => x.iface === iface._id)) {
              iface.data.operstate = 'down'
              iface.data.default = false
              this.service.patch(
                iface._id,
                { data: iface.data }
              )
            }
          })

          Object.keys(data).map((k) => {
            if (data[k]) {
              const ifaceData = {
                ifaceName: data[k].ifaceName,
                mac: data[k].mac,
                ip4: data[k].ip4,
                ip6: data[k].ip6,
                internal: data[k].internal,
                virtual: data[k].virtual,
                operstate: data[k].operstate
              }

              // Set default interface
              if (data[k].iface === defaultInterfaceId) {
                ifaceData.default = true
              } else {
                ifaceData.default = false
              }

              this.service.patch(
                data[k].iface,
                { data: ifaceData },
                { nedb: { upsert: true } }
              ).catch(() => {
                this.service.create({
                  _id: data[k].iface,
                  data: ifaceData
                })
              })
            }
          })
        })
        .catch((err) => {
          return err
        })
    }

    setInterval(updateInterfaces, 5000)
  }
}

module.exports = function (app) {
  const Model = createModel(app)
  // const paginate = app.get('paginate')

  const options = {
    Model
  }

  // Initialize our service with any options it requires
  app.use('/interfaces', createService(options))

  // Get our initialized service so that we can register hooks
  const service = app.service('interfaces')

  service.hooks(hooks)

  app.networkService = new Interfaces(app, service)
  app.networkService.init()
}
