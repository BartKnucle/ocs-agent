const io = require('socket.io-client')
const feathers = require('@feathersjs/feathers')
const socketio = require('@feathersjs/socketio-client')
const auth = require('@feathersjs/authentication-client')

const createModel = require('../../models/client.model')
const { Client } = require('./client.class')
const hooks = require('./client.hooks')

module.exports = async (app) => {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  }

  app.use('/client', new Client(options, app))
  const service = app.service('client')

  service.hooks(hooks)

  credentials = {
    _id: app.get('deviceId')
  }

  const socket = io(app.get('remoteApiURL'), { secure: true, reconnect: true, rejectUnauthorized: false })
  app.client = feathers()
  app.client.configure(socketio(socket))
  app.client.configure(auth())

  socket.on('connect', async (socket) => {
    console.log('Connected')

    await service.get(credentials._id)
    .then(async (data) => {
      credentials = data
    })
    .catch(() => {
      credentials.password = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
      service.create(credentials)
    })

    await app.client.service('users').create(credentials)
    .catch((err) => {
      app.log({
        level: 0,
        text: `Remote user allready created: ${err}`
      })
    })

    await app.client.service('authentication').create({ ...credentials, strategy: 'local' })
      .then(() => {
        console.log('authenticated')
      })
      .catch((err) => {
        app.log({
          level: 0,
          text: `Unable to connect to remote server: ${err}`
        })
      })

  })
}
