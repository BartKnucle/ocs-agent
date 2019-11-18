const si = require('systeminformation')
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

  async fill () {
    super.fill()

    await si.system()
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

module.exports = async (app) => {
  const device = new Device(app)
  await device.init()
}
