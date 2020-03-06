const path = require('path')
const { exec } = require('child_process')
const Shell = require('node-powershell')
const ServiceClass = require('../service.class')

exports.Applications = class Applications extends ServiceClass {
  constructor (options, app) {
    super(options, app)
    this.remote = '/api/applications'
  }

  setup (app) {
    app.service('/api/client').on('started', () => {
      //  Check if the cache directory exist create it if not
      /*  if (!fs.existsSync('./server/data/cache/applications')) {
        fs.mkdirSync('./server/data/cache/applications', { recursive: true })
      } */

      super.setup(app)
      this.check()
    })
  }

  // Add events on remote applications service to update the local service
  check () {
    const remoteService = this.app.client.service(this.remote)

    remoteService.on('created', (data) => {
      this.create(data)
    })
    //  remoteService.on('updated', data => console.log('updated a application', data))
    //  remoteService.on('patched', data => console.log('patched a application', data))
  }

  // Process a software installation
  install (app) {
    this.download(app)
      .then(() => {
        this.extract(app)
          .then(() => {
            this.detect(app)
              .then((result) => {
                if (result !== 'Installed') {
                  this.execPS(app, 'install.ps1')
                    .then(() => {
                      this.patch(app._id, { status: 'Installed' })
                    })
                }
              })
          })
      })
  }

  //  Uninstall a software
  unInstall (app) {
    this.download(app)
      .then(() => {
        this.extract(app)
          .then(() => {
            this.detect(app)
              .then((result) => {
                if (result === 'Installed') {
                  this.execPS(app, 'remove.ps1')
                    .then(() => {
                      this.patch(app._id, { status: 'Not installed' })
                    })
                }
              })
          })
      })
  }

  // Check if the application is in cache
  inCache (id) {}

  // Download file from distribution point
  download (app) {
    return this.patch(app._id, { status: 'Downloading' })
      .then(() => {
        return this.app.service('/api/files').download(app.file)
          .then(() => {
            return this.patch(app._id, { status: 'Downloaded' })
          })
      })
  }

  // Extract the archive and remove it
  extract (app) {
    return this.patch(app._id, { status: 'Extracting' })
      .then(() => {
        return this.app.service('/api/files').extract(app.file)
          .then(() => {
            return this.patch(app._id, { status: 'Extracted' })
          })
      })
  }

  detect (app) {
    return this.patch(app._id, { status: 'Detecting' })
      .then(() => {
        switch (app.type) {
          case 'Powershell':
            return this.execPS(app, 'detect.ps1')
          case 'cmd':
            return this.execCMD(app, 'detect.cmd')
        }
      })
  }

  // Detect if a software is present
  execPS (app, command) {
    const ps = new Shell({
      executionPolicy: 'Bypass',
      noProfile: true
    })

    const scriptPath = path.join(this.app.get('homePath'), '/files/cache/', app.file, command)
    ps.addCommand(scriptPath)
    return ps.invoke()
      .then((output) => {
        ps.dispose()
        return output
      })
      .catch((err) => {
        ps.dispose()
        return err
      })
  }

  execCMD (id, command) {
    const scriptPath = path.join(this.app.get('cachePath'), 'applications', id, command)
    exec('sh ' + scriptPath, (error, stdout, stderr) => {
      if (error) {
        throw error
      }
    })
  }
}
