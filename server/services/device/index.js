const si = require('systeminformation')
const defaultGateway = require('default-gateway')
const Service = require('../service')

class Device extends Service {
  constructor (app) {
    super(app)
    this.update = 5000
    this.remote = this.app.client.service('devices')
    this.hooks = require('./hooks')
  }

  init () {
    super.init()
  }

  fill () {
    super.fill()

    si.system()
      .then((data) => {
        this.data._id = data.uuid

        //  Wait for the ID before getting others informations
        si.osInfo()
          .then((data) => {
            this.data.hostname = data.hostname
            this.data.distro = data.distro
          })
          .catch((err) => {
            this.log({
              level: 2,
              text: `Cannot get system information: ${err}`
            })
          })

        defaultGateway.v4()
          .then((data) => {
            this.data.gatewayV4 = data.gateway
          })
          .catch((err) => {
            this.log({
              level: 1,
              text: `Cannot get V4 gateway: ${err}`
            })
          })

        defaultGateway.v6()
          .then((data) => {
            this.data.gatewayV6 = data.gateway
          })
          .catch((err) => {
            this.log({
              level: 1,
              text: `Cannot get V6 gateway: ${err}`
            })
          })
      })
      .catch((err) => {
        this.log({
          level: 2,
          text: `Cannot get system ID: ${err}`
        })
      })
  }

  push () {
    super.push()
    this.remote.create(this.data)
      .catch(() => {
        this.remote.patch(this.data._id, this.data)
      })
  }
}

module.exports = function (app) {
  const device = new Device(app)
  device.init()
}
