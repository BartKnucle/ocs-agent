const io = require('socket.io-client')
const feathers = require('@feathersjs/feathers')
const socketio = require('@feathersjs/socketio-client')
const auth = require('@feathersjs/authentication-client')
const si = require('systeminformation')

class Client {
  constructor(app) {
    const socket = io(app.get('remoteApiURL'), { secure: true, reconnect: true, rejectUnauthorized: false })
    app.client = feathers()
    app.client.configure(socketio(socket))
    app.client.configure(auth())
    this.app = app
    this.credentials = {}
  }

  async init () {
    await si.system()
      .then((data) => {
        this.credentials.user = data.uuid
      })
      .catch((err) => {
        this.log({
          level: 2,
          text: `Cannot get system ID as user: ${err}`
        })
      })

    this.credentials.password = 'pass'
    this.app.client.service('users').create(this.credentials)
      .then(() => {
        this.app.client.service('authentication').create({...this.credentials, strategy: 'local' })
      })
      .catch((err) => {
        this.app.client.service('authentication').create({...this.credentials, strategy: 'local' })
      })
  }
}

module.exports = async (app) => {
  const client = new Client(app)
  await client.init()
}
