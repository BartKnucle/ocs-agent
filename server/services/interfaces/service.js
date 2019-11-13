const os = require('os')
const createService = require('feathers-nedb')
const si = require('systeminformation')
const nc = require('network-calculator')
const createModel = require('../../models/interfaces.model')
const hooks = require('./hooks')

class Interfaces {
  constructor (app, service) {
    this.app = app
    this.service = service
    this.subnets = this.app.client.service('subnets')
  }

  init () {
    const nodeInterfaces = os.networkInterfaces()
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
                ip4_subnet: nodeInterfaces[data[k].iface].find(x => x.address === data[k].ip4).netmask,
                ip6: data[k].ip6,
                ip6_subnet: nodeInterfaces[data[k].iface].find(x => x.address === data[k].ip6).netmask,
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

              this.push()
            }
          })
        })
        .catch((err) => {
          return err
        })
    }

    setInterval(updateInterfaces, 5000)
  }

  // Push data to server
  push () {
    // Push default subnet
    this.service.find().then((data) => {
      const subnet = data.find(x => x.data.default === true)
      if (subnet) {
        const network = nc(subnet.data.ip4, subnet.data.ip4_subnet)
        const data = {
          _id: network.network + '/' + network.bitmask,
          data: network
        }

        this.subnets.create(data)
          .catch(() => {
            this.subnets.patch(data._id, data)
          })
      }
    })

    // Push default gateway
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
