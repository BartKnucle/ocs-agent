const path = require('path')
const { app, BrowserWindow, Menu, Tray, nativeImage } = require('electron')
const iconpath = './client/static/v.png'

let window
let tray
let icon
let contextMenu

const createWindow = async () => {
  process.env.NODE_ENV = 'production'
  const server = require('./server')
  await server.start()

  // Tray icon and menu
  icon = nativeImage.createFromPath(iconpath)
  tray = new Tray(icon)

  contextMenu = Menu.buildFromTemplate([
    {
      label: 'Show App',
      click: () => {
        window.show()
      }
    },
    {
      label: 'Quit',
      click: () => {
        app.isQuiting = true
        app.quit()
      }
    }
  ])

  tray.setContextMenu(contextMenu)

  // Main window
  window = new BrowserWindow({
    width: 1024,
    height: 768,
    frame: true,
    resizable: false,
    icon: iconpath,
    enableRemoteModule: true
  })

  window.setMenu(null)

  window.on('close', function (event) {
    if (!app.isQuiting) {
      event.preventDefault()
      window.hide()
    }
    return false
  })

  window.on('minimize', function (event) {
    event.preventDefault()
    window.hide()
  })

  window.on('show', function () {
    //  appIcon.setHighlightMode('always')
  })

  /* Si vous décommentez cette ligne, vous verrez la console de débug Chrome */
  window.webContents.openDevTools()

  /* Display the homepage of the server */
  window.loadURL('https://127.0.0.1:3000')
}

app.setAppUserModelId(process.execPath)

// SSL/TSL: this is the self signed certificate support
app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
  const skipError = true
  // On certificate error we disable default behaviour (stop loading the page)
  // and we then say "it is all fine - true" to the callback
  event.preventDefault()
  callback(skipError)
})

app.on('ready', createWindow)
// app.on('activate', () => window === null && createWindow())
