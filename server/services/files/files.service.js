const path = require('path')
const multer = require('multer')

module.exports = (app) => {
  const upload = multer({ dest: path.join(app.get('homePath'), '/files/') })
  app.post('/files', upload.single('avatar'), (req, res, next) => {
    if (req.file) {
      res.send(req.file.filename)
    }
  })

  app.get('/files:file(*)', (req, res) => {
    var file = req.params.file
    var fileLocation = path.join(app.get('homePath'), '/files/', file)
    res.download(fileLocation, file)
  })
}
