const si = require('systeminformation')
const defaultGateway = require('default-gateway')
const Service = require('../service')

class Interfaces extends Service {
  constructor (app) {
    super(app)
    this.update = 5000
    this.remote = this.app.client.service('subnets')
    this.hooks = require('./hooks')
  }

  init () {
    super.init()
  }

  fill () {
    super.fill()

    //  Get data from database
    this.service.find()
      .then((dbData) => {
        // Get new data
        si.networkInterfaces()
          .then((interfaces) => {
            //  Remove interfaces not new data
            dbData.forEach((iface) => {
              if (!interfaces.find(x => x.iface === iface._id)) {
                delete this.data[iface._id]
              }
            })

            //  Get the default interface
            si.networkInterfaceDefault()
              .then((defaultIface) => {
                //  Update data
                interfaces.forEach((iface) => {
                  //  filter interface fields
                  const { duplex, speed, mtu, carrierChanges, ...rest } = iface

                  // Check if network interface is no more preset
                  if (rest.iface === defaultIface) {
                    rest.default = true
                    // Update device IP data
                    this.app.device.data.ip4 = iface.ip4
                    // Get the default gateway
                    defaultGateway.v4()
                      .then((data) => {
                        this.app.device.data.gatewayV4 = data.gateway
                      })
                      .catch((err) => {
                        this.log({
                          level: 1,
                          text: `Cannot get V4 gateway: ${err}`
                        })
                      })
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
      })
      .catch((err) => {
        this.log({
          level: 2,
          text: `Cannot network interfaces from database: ${err}`
        })
      })
  }
}

module.exports = function (app) {
  const interfaces = new Interfaces(app)
  interfaces.init()
}
