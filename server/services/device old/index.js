const si = require('systeminformation')
const Service = require('../service')

class Device extends Service {
  constructor (app) {
    super(app)
    this.update = 5000
    this.remote = this.app.client.service('devices')
  }

  init () {
    super.init()
  }

  fill () {
    super.fill()
    this.data.id = this.app.deviceId
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
  }

  push () {
    super.push()
    this.remote.create(
      {
        _id: this.data.id,
        data: this.data
      })
      .catch(() => {
        this.remote.patch(this.data.id, this.data)
      })
  }
}

module.exports = (app) => {
  const device = new Device(app)
  device.init()
}
