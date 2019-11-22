const path = require('path')
const io = require('socket.io-client')
const feathers = require('@feathersjs/feathers')
const socketio = require('@feathersjs/socketio-client')
const auth = require('@feathersjs/authentication-client')
const NeDB = require('nedb')

class Client {
  constructor (app) {
    this.name = this.constructor.name.toLowerCase()
    this.app = app
    this.log = app.logger.log
    this.credentials = {}
  }

  async init () {
    this.model = new NeDB({
      filename: path.join(this.app.get('nedb'), this.name + '.db'),
      autoload: true
    })

    const socket = io(this.app.get('remoteApiURL'), { secure: true, reconnect: true, rejectUnauthorized: false })
    this.app.client = feathers()
    this.app.client.configure(socketio(socket))
    this.app.client.configure(auth())

    await this.model.findOne({ _id: this.credentials._id }, async (err, doc) => {
      if (!err && doc) {
        //  Get credentials from db
        this.credentials = doc
      } else {
        //  Or create them
        this.credentials.password = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

        this.model.insert(this.credentials)
      }

      await this.app.client.service('users').create(this.credentials)
        .catch((err) => {
          this.log({
            level: 0,
            text: `Remote user allready created: ${err}`
          })
        })

      await this.app.client.service('authentication').create({ ...this.credentials, strategy: 'local' })
        .catch((err) => {
          this.log({
            level: 0,
            text: `Unable to connect to remote server: ${err}`
          })
        })
    })
  }
}

module.exports = async (app) => {
  const client = new Client(app)
  await client.init()
}
