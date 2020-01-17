exports.Device = class Device {
  constructor(id, params) {
    this.id = id
    this.params = params
  }

  // Connect the device
  connect(time) {
    console.log('Connected ' + this.id)
  }

  // Disconnect the device
  disconnect(time) {
    console.log('Disonnected ' + this.id)
  }
}