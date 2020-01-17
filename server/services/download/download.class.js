const ServiceClass = require('../service.class')
const https = require('https')
const fs = require('fs')
const path = require('path')

exports.Download = class Download extends ServiceClass {
  constructor (options, app) {
    super(options, app)
    this.remote = '/api/devicesdps'
  }

  setup (app) {
    app.service('/api/client').on('started', () => {
      super.setup(app)
      if (!fs.existsSync(path.join(app.get('homePath'), '/files/'))) {
        fs.mkdirSync(path.join(app.get('homePath'), '/files/'))
      }
    })
  }

  listDps() {
    return this.app.client.service(this.remote).find()
  }

  download(file) {
    this.listDps()
      .then((dps) => {
        const localFile = fs.createWriteStream(path.join(this.app.get('homePath'), '/files/', file))
        const url = 'https://' + dps.data[0].net_ip4 + ':' + dps.data[0].cli_port + '/files/' + file
        process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0
        https.get(url , (response) => {
          response.pipe(localFile)
        })
      })
  }
}
