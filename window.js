const { app, BrowserWindow, Menu, Tray, nativeImage } = require('electron')
var path = require('path')
var iconpath = path.join(__dirname, '/static/v.png')
const server = require('./server')

let window
let tray
let icon
let contextMenu

createWindow = async () => {
    await server.start()

    // Tray icon and menu
    icon = nativeImage.createFromPath(iconpath);
    tray = new Tray(icon)

    contextMenu = Menu.buildFromTemplate([
        {
            label: 'Show App', click: function () {
                window.show()
            }
        },
        {
            label: 'Quit', click: function () {
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
        icon: iconpath
    })

    window.setMenu(null)

    window.on('close', function (event) {
        if(!app.isQuiting){
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
        //appIcon.setHighlightMode('always')
    })

    /* Si vous décommentez cette ligne, vous verrez la console de débug Chrome */
    window.webContents.openDevTools()

    /* Display the homepage of the server */
    window.loadURL('https://127.0.0.1:3000')
}

app.setAppUserModelId(process.execPath)

// SSL/TSL: this is the self signed certificate support
app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
    // On certificate error we disable default behaviour (stop loading the page)
    // and we then say "it is all fine - true" to the callback
    event.preventDefault();
    callback(true);
})

app.on('ready', createWindow)
// app.on('activate', () => window === null && createWindow())