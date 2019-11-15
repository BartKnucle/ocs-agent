const si = require('systeminformation')
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

  // Push data to server
  /* push () {
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
  } */
}

module.exports = function (app) {
  const interfaces = new Interfaces(app)
  interfaces.init()
}
