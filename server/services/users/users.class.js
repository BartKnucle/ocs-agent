const ServiceClass = require('../service.class')

exports.Users = class Users extends ServiceClass {
  setup (app) {
    app.on('login', this.onConnect.bind(this))
    app.on('disconnect', this.onDisconnect.bind(this))

    super.setup(app)
  }

  //  On user connection
  onConnect (authResult) {
    return this.patch(
      authResult.user._id,
      { online: true }
    )
  }

  //  On user diconnection
  onDisconnect (connection) {
    if (connection.user) {
      return this.patch(
        connection.user._id,
        { online: false }
      )
        .catch(() => {
          return false
        })
    } else {
      return false
    }
  }
}
