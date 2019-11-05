import feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import io from 'socket.io-client'
import feathersVuex from 'feathers-vuex'

// Setup the Feathers client
const socket = io(process.env.remoteApiURL, { transports: ['websocket'] })
const feathersClient = feathers()
  .configure(socketio(socket))

export default feathersClient

// Setup feathers-vuex
const {
  makeServicePlugin,
  makeAuthPlugin,
  BaseModel,
  models,
  clients,
  FeathersVuex
} = feathersVuex(feathersClient)

export {
  makeAuthPlugin,
  makeServicePlugin,
  BaseModel,
  models,
  clients,
  FeathersVuex
}
