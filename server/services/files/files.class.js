const fs = require('fs')
const path = require('path')
const https = require('https')
const ServiceClass = require('../service.class')

exports.Files = class Files extends ServiceClass {
  constructor (options, app) {
    super(options, app)
    this.remote = '/api/devicesdps'
  }

  setup (app) {
    app.service('/api/client').on('started', () => {
      super.setup(app)
      fs.access(path.join(app.get('homePath'), '/files/'), fs.constants.F_OK, (err) => {
        if (err) {
          fs.mkdirSync(path.join(app.get('homePath'), '/files/'))
        }
      })
    })
  }

  // Sync files and database
  clear () {
    fs.readdir(path.join(this.app.get('homePath'), '/files/'), (err, files) => {
      if (err) {
        return err
      }
      files.map((file) => {
        //  Remove local file
        this.get(file)
          .catch(() => {
            fs.unlink(path.join(this.app.get('homePath'), '/files/' + file), (err) => {
              if (err) {
                return err
              }
            })
          })
      })
    })

    //  Remove database record if the file isnot present
    this.find()
      .then((files) => {
        files.map((file) => {
          fs.access(path.join(this.app.get('homePath'), '/files/'), fs.constants.F_OK, (err) => {
            if (err) {
              this.remove(file._id)
            }
          })
        })
      })
  }

  listDps () {
    return this.app.client.service(this.remote).find()
  }

  download (file) {
    this.listDps()
      .then((dps) => {
        const localFile = fs.createWriteStream(path.join(this.app.get('homePath'), '/files/', file))
        const url = 'https://' + dps.data[0].net_ip4 + ':' + dps.data[0].cli_port + '/files/' + file
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0
        https.get(url, (response) => {
          response.pipe(localFile)
        })
      })
  }
}
