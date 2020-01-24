const { Services } = require('./services.class')

module.exports = (app) => {
  const servicesList = [
    'setup',
    'logger',
    'users',
    'authentication',
    'device',
    'interfaces',
    'applications',
    'updates',
    'files',
    'client'
  ]

  const services = new Services(app, servicesList)
  services.setup()
}
