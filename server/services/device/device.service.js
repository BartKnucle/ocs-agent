const si = require('systeminformation')
const createModel = require('../../models/device.model')
const { Device } = require('./device.class')
const hooks = require('./device.hooks')

module.exports = async (app) => {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  }

  app.use('/device', new Device(options, app))
  const service = app.service('device')

  service.hooks(hooks)

  //  Get devices informations
  await si.system()
    .then(async (data) => {
      app.deviceId = data.uuid


      await service.get(app.deviceId)
        .then(() => {
          service.patch(
            app.deviceId,
            data,
            { prefix: 'sys' }
          )
        })
        .catch(() => {
          service.create({
            _id: app.deviceId,
            ...data
          },
          { prefix: 'sys' })
        })
    })

  si.osInfo()
    .then((data) => {
      service.patch(
        app.deviceId,
        data,
        { prefix: 'os' }
      )
    })
}
