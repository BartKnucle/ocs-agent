const os = require('os')
const si = require('systeminformation')
const defaultGateway = require('default-gateway')
const ServiceClass = require('../service.class')

exports.Interfaces = class Interfaces extends ServiceClass {
  async setup (app) {
    app.service('/api/device').on('started', () => {
      setInterval(this.updateIfaces.bind(this), 10000)
      super.setup(app)
    })
  }

  //  Get the computer network interfaces
  getInterfaces () {
    return defaultGateway.v4()
      .then((defaultIface) => {
        return si.networkInterfaces()
          .then((interfaces) => {
            return interfaces.filter(iface => !iface.virtual && iface.ip4 !== '127.0.0.1')
            .map((iface) => {
              iface._id = iface.iface
              iface.default = iface.iface === defaultIface.interface ? true : false
              iface.ip4_subnet = os.networkInterfaces()[iface.iface].find(x => x.address === iface.ip4).cidr
              iface.ip6_subnet = os.networkInterfaces()[iface.iface].find(x => x.address === iface.ip6).cidr
              const { duplex, speed, mtu, carrierChanges, ...rest } = iface
              return rest
            })
          })
      })
      .catch(() => { // No default gateway, we return nothing
        return []
      })
  }

  //  Get interfaces names only
  getInterfacesNames () {
    return this.getInterfaces()
    .then((interfaces) => {
      return interfaces.map((iface) => {
        return iface.iface
      })
    })
  }

  //  Get the default interface
  getDefaultInterface () {
    return this.getInterfaces()
      .then((interfaces) => {
        return interfaces.find(iface => iface.default)
      })
  }

  //  Add interfaces to database
  addInterfaces () {
    return this.getInterfaces()
      .then((interfaces) => {
        interfaces.forEach(iface => {
          this.get(iface._id)
            .then(() => {
              this.update(iface._id, iface)
            })
            .catch(() => {
              this.create(iface)
            })
        })
      })
  }

  //  Remove old interfaces
  removeOldInterfaces () {
    return this.getInterfacesNames()
      .then((name) => {
        return this.remove(
          null,
          {
            query: {
              _id: {
                $nin: name
              }
            }
          }
        )
      })
  }

  updateIfaces() {
    return this.removeOldInterfaces()
      .then(() => {
        return this.addInterfaces()
      })
  }

  // Update the interfaces list
  updateIfacesOld () {
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
