exports.Services = class Services {
  constructor (app, services) {
    this.app = app
    this.services = services
  }

  setup () {
    this.services.forEach((service) => {
      this.load(service)
    })
  }

  // Load a service
  load (service) {
    this.app.configure(require('./' + service + '/service'))
  }
}
