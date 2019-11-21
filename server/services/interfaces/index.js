const os = require('os')
const si = require('systeminformation')
const defaultGateway = require('default-gateway')
const Service = require('../service')

class Interfaces extends Service {
  constructor (app) {
    super(app)
    this.update = 5000
    this.remote = this.app.client.service('subnets')
  }

  init () {
    super.init()
  }

  fill () {
    super.fill()

    si.networkInterfaces()
      .then((interfaces) => {
        //  Remove interfaces not new data
        for (const iface in this.data) {
          if (!interfaces.find(x => x.iface === iface)) {
            delete this.data[iface]
          }
        }

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
                this.app.device.data.ip4 = iface.ip4
                this.app.device.data.ip4_subnet = iface.ip4_subnet
                this.app.device.data.gatewayV4 = defaultIface.gateway
                // Get the default gateway
              }

              this.data[iface.iface] = rest
            })
          })
          .catch((err) => {
            this.log({
              level: 2,
              text: `Cannot default interface: ${err}`
            })
          })
      })
      .catch((err) => {
        this.log({
          level: 2,
          text: `Cannot network interfaces: ${err}`
        })
      })
  }
}

module.exports = function (app) {
  const interfaces = new Interfaces(app)
  interfaces.init()
}
