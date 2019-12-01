const { app, BrowserWindow } = require('electron')
const server = require('./server')

let window

createWindow = async () => {
    /* Créer une fenêtre de 800px par 600px sans bordures */
    await server.start()

    window = new BrowserWindow({
        width: 1024,
        height: 768,
        frame: false
    })

    /* Si vous décommentez cette ligne, vous verrez la console de débug Chrome */
    //window.webContents.openDevTools()

    /* Display the homepage of the server */
    window.loadURL('https://127.0.0.1:3000')

    /* Lorsque la fenêtre est fermée, on l'indique au système */
    window.on('closed', () => {
        window = null;
    })
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
app.on('activate', () => window === null && createWindow())