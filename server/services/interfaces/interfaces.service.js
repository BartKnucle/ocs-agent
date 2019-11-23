const os = require('os')
const si = require('systeminformation')
const defaultGateway = require('default-gateway')
const createModel = require('../../models/interfaces.model')
const { Interfaces } = require('./interfaces.class')
const hooks = require('./interfaces.hooks')

module.exports = async (app) => {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  }

  app.use('/interfaces', new Interfaces(options, app))
  const service = app.service('interfaces')

  service.hooks(hooks)

  const update = () => {
    si.networkInterfaces()
      .then(async (interfaces) => {
        //  Remove interfaces not new data
        await service.find({
          query: {}
        })
          .then((ifaces) => {
            ifaces.forEach(async iface => {
              if (!interfaces.find(x => x.iface === iface._id)) {
                await service.remove(iface._id)
              }
            })
          })


        // Get the os library interfaces data
        const osNetworkInterfaces = os.networkInterfaces()

        //  Get the default gateway
        defaultGateway.v4()
          .then((defaultIface) => {
            //  Update data
            interfaces.forEach((iface) => {
              //  filter interface fields
              const { duplex, speed, mtu, carrierChanges, ...rest } = iface

              //  Add the os library informations
              const osInterfaceV4 = osNetworkInterfaces[iface.iface].find(x => x.address === iface.ip4)
              iface.ip4_subnet = osInterfaceV4.cidr

              const osInterfaceV6 = osNetworkInterfaces[iface.iface].find(x => x.address === iface.ip6)
              iface.ip6_subnet = osInterfaceV6.cidr

              // Check if this it the default interface
              if (rest.iface === defaultIface.interface) {
                rest.default = true
                // Update device IP data

                app.service('device').patch(
                  app.get('deviceId'),
                  {
                    ip4: iface.ip4,
                    ip4_subnet: iface.ip4_subnet,
                    gatewayV4: defaultIface.gateway,
                  },
                  { prefix: 'net' }
                )
              }

              service.create({
                _id: rest.iface,
                ...rest
              })
                .catch(() => {
                  service.patch(rest.iface, rest)
                })
            })
          })
          .catch((err) => {
            app.log({
              level: 2,
              text: `Cannot default interface: ${err}`
            })
          })
      })
      .catch((err) => {
        app.log({
          level: 2,
          text: `Cannot network interfaces: ${err}`
        })
      })

  }

  setInterval(update, 10000)
}
