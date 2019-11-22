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

  // Check if we have to update the data
  const update = (oldData, newData) => {
    return Object.keys(newData).reduce((result, item) => {
      result = (oldData[item] !== newData[item]) || result
      return result
    }, false)
  }

  //  Change the prefix of the data keys
  const changeKey = (prefix, data) => {
    return Object.assign(
      {},
      ...Object.keys(data)
        .map(key => ({ [`${prefix}_${key}`]: data[key] }))
    )
  }

  //  Get devices informations
  await si.system()
    .then(async (data) => {
      app.deviceId = data.uuid

      // const newData = changeKey('sys', data)

      await service.get(app.deviceId)
        .then(() => {
          //  if (update(oldData, newData)) {
          service.patch(
            app.deviceId,
            data,
            { prefix: 'sys' }
          )
          // } */
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
        { prefix: 'sys' }
      )
      /* service.get(app.deviceId)
        .then((oldData) => {
          const newData = changeKey('os', data)

          //  if (update(oldData, newData)) {
          service.patch(
            app.deviceId,
            newData,
            params
          )
          //  }
        }) */
    })
}
