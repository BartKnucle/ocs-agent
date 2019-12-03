const fs = require("fs")
const Shell = require('node-powershell')
const ServiceClass = require('../service.class')

exports.Software = class Software extends ServiceClass {
  setup (app) {

    //Check if the cache directory exist create it if not
    if (!fs.existsSync('./server/data/cache/software')) {
      fs.mkdirSync('./server/data/cache/software', {recursive: true})
    } 

    super.setup(app)
  }

  // Check server for new software
  check() {}

  // Process a software installation
  install(id) {
    // Get the software informations
    if (!this.detect(id)) {
      if (!this.inCache(id)) {
        // Process the download
        this.download(id)
        // Install the software
        this.extract(id)
      }

      this.get(id).then((software) => {
        //Install software
        switch (software.install_type) {
          case 'powershell':
              this.execPS(software.install_command)
            break
          case 'cmd':
            this.execCMD(software.install_command)
            break
          default:
            break
        }
      })
    }
  }

  // Check if the application is in cache
  inCache(id) {}

  // Download file from distribution point
  download(id) {}

  // Extract the archive and remove it
  extract(id) {}

  async detect(id) {
    const software = await this.get(id)
    switch (software.detect_type) {
      case 'powershell':
          return this.execPS(id, software.detect_command)
        break
      case 'cmd':
        return this.execCMD(id, software.detect_command)
      break;
      default:
        break;
    }

  }

  // Detect if a software is present
  execPS(id, command) {
    const ps = new Shell({
      executionPolicy: 'Bypass',
      noProfile: true
    })

    ps.addCommand('./server/data/cache/software/' + id + '/' + command)
    ps.invoke()
    .then(output => {
      console.log(output)
      ps.dispose()
    })
    .catch(err => {
      console.log(err)
      ps.dispose()
    })
  }

  execCMD(id, command) {}
}
