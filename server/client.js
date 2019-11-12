module.exports = (app) => {
  const io = require('socket.io-client')
  const feathers = require('@feathersjs/feathers')
  const socketio = require('@feathersjs/socketio-client')

  const socket = io(app.get('remoteApiURL'), { secure: true, reconnect: true, rejectUnauthorized: false })
  app.client = feathers()

  app.client.configure(socketio(socket))
}
