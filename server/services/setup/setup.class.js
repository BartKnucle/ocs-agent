const si = require('systeminformation')
const ServiceClass = require('../service.class')

const services = [
  {
    _id: 'setup',
    description: 'Configuration service',
    started: false
  },
  {
    _id: 'client',
    description: 'Client service',
    started: false
  },
  {
    _id: 'logger',
    description: 'Logger service',
    started: false
  },
  {
    _id: 'interfaces',
    description: 'Network interfaces service',
    started: false
  },
  {
    _id: 'device',
    description: 'Device service',
    started: false
  },
  {
    _id: 'software',
    description: 'Software service',
    started: false
  },
  {
    _id: 'updates',
    description: 'Updates service',
    started: false
  }
]

exports.Setup = class Setup extends ServiceClass {
  async setup (app) {
    //Set the default status
    await this.create(services)

    // Get device ID
    await si.system()
      .then((data) => {
        app.set('deviceId', data.uuid)
      })
    super.setup(app)
  }
}
