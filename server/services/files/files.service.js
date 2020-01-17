const createModel = require('../../models/files.model')
const { Files } = require('./files.class')
const hooks = require('./files.hooks')
const path = require('path')
const multer = require('multer')

module.exports = (app) => {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    multi: true
  }

  app.use('/api/files', new Files(options, app))
  const service = app.service('/api/files')

  service.hooks(hooks)

  //  Routes to files publishing and downloading
  const upload = multer({ dest: path.join(app.get('homePath'), '/files/') })
  app.post('/files', upload.single('avatar'), (req, res, next) => {
    if (req.file) {
      service.create({ _id: req.file.filename })
      res.send(req.file.filename)
    }
  })

  app.get('/files:file(*)', (req, res) => {
    var file = req.params.file
    var fileLocation = path.join(app.get('homePath'), '/files/', file)
    res.download(fileLocation, file)
  })
}
