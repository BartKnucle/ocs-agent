const ServiceClass = require('../service.class')
const fs = require('fs')
const path = require('path')

exports.Files = class Files extends ServiceClass {
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

  // Sync files and database
  clear() {
    fs.readdir(path.join(this.app.get('homePath'), '/files/'), (err, files) => {
      files.map((file) => {
        //  Remove local file
        this.get(file)
          .catch(() => {
            fs.unlink(path.join(this.app.get('homePath'), '/files/' + file), (err) => {})
          })
      })
    })

    //  Remove database record if the file isnot present
    this.find()
      .then((files) => {
        files.map((file) => {
          fs.exists(path.join(this.app.get('homePath'), '/files/' + file._id), (exist) => {
            if (!exist) {
              this.remove(file._id)
            }
          })
        })
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
