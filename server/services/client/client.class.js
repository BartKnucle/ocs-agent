const io = require('socket.io-client')
const feathers = require('@feathersjs/feathers')
const socketio = require('@feathersjs/socketio-client')
const auth = require('@feathersjs/authentication-client')
const ServiceClass = require('../service.class')

exports.Client = class Client extends ServiceClass {
  setup (app) {
    app.service('logger').on('started', () => {
      let credentials = {
        _id: app.get('deviceId')
      }

      const socket = io(app.get('remoteApiURL'), { secure: true, reconnect: true, rejectUnauthorized: false })
      app.client = feathers()
      app.client.configure(socketio(socket))
      app.client.configure(auth())

      socket.on('connect', async (socket) => {
        console.log('Connected')

        await this.get(credentials._id)
          .then((data) => {
            credentials = data
          })
          .catch(() => {
            credentials.password = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
            this.create(credentials)
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
            super.setup(app)
          })
          .catch((err) => {
            app.log({
              level: 0,
              text: `Unable to connect to remote server: ${err}`
            })
          })
      })
    })
  }
}
