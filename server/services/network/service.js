// Initializes the `users` service on path `/users`
const createService = require('feathers-nedb')
const createModel = require('../../models/network.model')
const hooks = require('./hooks')
const si = require('systeminformation')

class Network {
  constructor(app, service) {
    this.app = app
    this.service = service
  }

  init () {
    const updateNetwork = () => {
      si.networkInterfaces()
        .then(async (data) => {
          
          //Deactivate network cards without remove
          const oldIfaces = await this.service.find()
          oldIfaces.forEach((iface) => {
            if (!data.find(x => x.iface === iface._id)) {
              iface.data.operstate = 'down'
              this.service.patch(
                iface._id,
                { data: iface.data }
              )
            }
          })

          Object.keys(data).map((k) => {
            if (data[k]) {
              let ifaceData = {
                ifaceName: data[k].ifaceName,
                mac: data[k].mac,
                ip4: data[k].ip4,
                ip6: data[k].ip6,
                internal: data[k].internal,
                virtual: data[k].virtual,
                operstate: data[k].operstate
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
  
    setInterval(updateNetwork, 5000)
  }
}

module.exports = function (app) {
  const Model = createModel(app)
  const paginate = app.get('paginate')

  const options = {
    Model
  }

  // Initialize our service with any options it requires
  app.use('/network', createService(options))

  // Get our initialized service so that we can register hooks
  const service = app.service('network')

  service.hooks(hooks)

  app.networkService = new Network(app, service)
  app.networkService.init()
}
