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
  install (id) {
    // Get the software informations
    if (!this.detect(id)) {
      if (!this.inCache(id)) {
        // Process the download
        this.download(id)
        // Install the software
        this.extract(id)
      }

      this.get(id).then((application) => {
        //  Install software
        this.patch(id, { status: 'Running command' })
        switch (application.install_type) {
          case 'powershell':
            this.execPS(application.install_command)
            break
          case 'cmd':
            this.execCMD(application.install_command)
            break
          default:
            break
        }
      })
        .catch((err) => {
          return err
        })
    }
  }

  // Check if the application is in cache
  inCache (id) {}

  // Download file from distribution point
  download (id) {
    this.patch(id, { status: 'Downloading' })
  }

  // Extract the archive and remove it
  extract (id) {
    this.patch(id, { status: 'Extracting' })
  }

  async detect (id) {
    this.patch(id, { status: 'Detecting' })
    const application = await this.get(id)
    switch (application.detect_type) {
      case 'powershell':
        return this.execPS(id, application.detect_command)
      case 'cmd':
        return this.execCMD(id, application.detect_command)
    }
  }

  // Detect if a software is present
  execPS (id, command) {
    const ps = new Shell({
      executionPolicy: 'Bypass',
      noProfile: true
    })

    ps.addCommand('./server/data/cache/applications/' + id + '/' + command)
    ps.invoke()
      .then((output) => {
        ps.dispose()
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
