const os = require('os')
const si = require('systeminformation')
const nc = require('network-calculator')
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
                this.log(err)
              })
          })
          .catch((err) => {
            this.log(err)
          })
      })
      .catch((err) => {
        this.log(err)
      })
    /*  const nodeInterfaces = os.networkInterfaces()
    si.networkInterfaceDefault()
      .then((data) => {
        const defaultInterfaceId = data
        this.log(defaultInterfaceId)
      })
    si.networkInterfaces()
      .then(async (data) => {
        this.log(data)
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
      }) */
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
