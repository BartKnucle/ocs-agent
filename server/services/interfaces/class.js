const os = require('os')
const si = require('systeminformation')
const defaultGateway = require('default-gateway')
const ServiceClass = require('../service.class')

exports.Interfaces = class Interfaces extends ServiceClass {
  setup (app) {
    app.service('/api/device').on('started', () => {
      setInterval(this.updateIfaces.bind(this), 10000)
      super.setup(app)
    })
  }

  // Update the interfaces list
  updateIfaces () {
    return si.networkInterfaces()
      .then(async (interfaces) => {
        //  Remove interfaces not new data
        await this.find({
          query: {}
        })
          .then((ifaces) => {
            ifaces.forEach(async (iface) => {
              if (!interfaces.find(x => x.iface === iface._id)) {
                await this.remove(iface._id)
              }
            })
          })

        // Get the os library interfaces data
        const osNetworkInterfaces = os.networkInterfaces()

        //  Get the default gateway
        return defaultGateway.v4()
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

                this.app.service('/api/device').patch(
                  this.app.get('deviceId'),
                  {
                    ip4: iface.ip4,
                    ip4_subnet: iface.ip4_subnet,
                    gatewayV4: defaultIface.gateway
                  },
                  { prefix: 'net' }
                )
              } else {
                rest.default = false
              }

              this.create({
                _id: rest.iface,
                ...rest
              })
                .catch(() => {
                  this.patch(rest.iface, rest)
                })
            })
          })
          .catch((err) => {
            this.app.log({
              level: 2,
              text: `Cannot default interface: ${err}`
            })
          })
      })
      .catch((err) => {
        this.app.log({
          level: 2,
          text: `Cannot network interfaces: ${err}`
        })
      })
  }
}