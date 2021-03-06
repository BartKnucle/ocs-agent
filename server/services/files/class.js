const fs = require('fs')
const path = require('path')
const https = require('https')
const extract = require('extract-zip')
const ServiceClass = require('../service.class')

exports.Files = class Files extends ServiceClass {
  constructor (options, app) {
    super(options, app)
    this.remote = '/api/devicesdps'
  }

  /* istanbul ignore next */
  setup (app) {
    app.service('/api/client').on('started', () => {
      super.setup(app)

      //  Create the directory if note exist
      fs.access(path.join(app.get('homePath'), '/files/'), fs.constants.F_OK, (err) => {
        if (err) {
          fs.mkdirSync(path.join(app.get('homePath'), '/files/'))
        }
      })

      fs.access(path.join(app.get('homePath'), '/files/cache/'), fs.constants.F_OK, (err) => {
        if (err) {
          fs.mkdirSync(path.join(app.get('homePath'), '/files/cache/'))
        }
      })

      //  Add events listener to remote service to catch Dps changes
      this.app.client.service(this.remote).on('created', this.updatedDps.bind(this))
      this.app.client.service(this.remote).on('patched', this.updatedDps.bind(this))
      this.app.client.service(this.remote).on('updated', this.updatedDps.bind(this))
      this.app.client.service(this.remote).on('removed', this.updatedDps.bind(this))

      //  Add events listener to remote service to catch Files changes
      this.app.client.service('/api/files').on('created', this.updatedDps.bind(this))
      this.app.client.service('/api/files').on('patched', this.updatedDps.bind(this))
      this.app.client.service('/api/files').on('updated', this.updatedDps.bind(this))
      this.app.client.service('/api/files').on('removed', this.updatedDps.bind(this))
    })
  }

  //  List of the dps have been updated
  /* istanbul ignore next */
  updatedDps () {
    this.isDp()
      .then((dp) => {
        if (dp) {
          this.downloadAll()
        }
      })
  }

  //  Check if the device is a distribution point
  /* istanbul ignore next */
  isDp () {
    return this.listDps()
      .then((dps) => {
        return dps.data.find(dp => dp._id === this.app.get('deviceId'))
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

    //  Remove database record if the file is not present
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

  /* istanbul ignore next */
  listDps () {
    return this.app.client.service(this.remote).find()
  }

  /* istanbul ignore next */
  download (fileId) {
    return this.listDps()
      .then((dps) => {
        const localFile = fs.createWriteStream(path.join(this.app.get('homePath'), '/files/', fileId))
        // const url = 'https://' + dps.data[0].net_ip4 + ':' + dps.data[0].cli_port + '/files/' + fileId
        const url = 'https://' + dps.data[0].net_ip4 + ':3001/files/' + fileId
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0
        return new Promise((resolve, reject) => {
          https.get(url, (response) => {
            response.pipe(localFile)
            //  const len = parseInt(response.headers['content-length'], 10)
            //  const total = len / 1048576 //  1048576 - bytes in  1Megabyte
            //  let cur = 0

            response.on('data', (chunk) => {
              //  cur += chunk.length
              //  console.log('Downloading ' + (100.0 * cur / len).toFixed(2) + '% ' + (cur / 1048576).toFixed(2) + ' Total size: ' + total.toFixed(2) + ' mb')
            })

            response.on('end', () => {
              resolve()
              //  console.log('Downloading complete')
            })

            response.on('error', (e) => {
              reject(e)
              //  console.log('Error: ' + e.message)
            })
          })
        })
      })
  }

  //  Extract the zip file
  extract (fileId) {
    const localFile = path.join(this.app.get('homePath'), '/files/', fileId)
    const localFolder = path.join(this.app.get('homePath'), '/files/cache/', fileId)
    return new Promise((resolve, reject) => {
      extract(localFile, { dir: localFolder }, (err) => {
        if (err) {
          reject(err)
        }
        resolve()
      })
    })
  }

  /* istanbul ignore next */
  // Liste the remote files from the server
  listRemoteFiles () {
    return this.app.client.service('/api/files').find()
  }

  /* istanbul ignore next */
  //  As DP download all files from another DP
  downloadAll () {
    this.listRemoteFiles()
      .then((files) => {
        files.data.forEach((file) => {
          this.download(file._id)
        })
      })
  }
}
