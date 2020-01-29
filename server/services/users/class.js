const ServiceClass = require('../service.class')

exports.Users = class Users extends ServiceClass {
  /* istanbul ignore next */
  setup (app) {
    app.on('login', this.onConnect.bind(this))
    app.on('disconnect', this.onDisconnect.bind(this))

    super.setup(app)
  }

  setOnline (userId) {
    return this.patch(
      userId,
      { online: true }
    )
  }

  setOffline (userId) {
    return this.patch(
      userId,
      { online: false }
    )
  }

  //  On user connection
  onConnect (authResult) {
    return this.setOnline(authResult.user._id)
  }

  //  On user diconnection
  onDisconnect (connection) {
    if (connection.user) {
      return this.setOffline(connection.user._id)
    }
  }
}
