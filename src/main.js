const { app, BrowserWindow, ipcMain } = require('electron')
const axios = require('axios')
const path = require('node:path')

let win;

const createWindow = () => {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadFile('index.html')
}

app.whenReady().then(() => {
    createWindow()

    ipcMain.handle('getInventory', async () => {
        const response = await axios.get('http://127.0.0.1:8000/inventory')
        return response.data
    })

    ipcMain.handle('getPublications', async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/publications')
            return response.data
        } catch (error) {
            return {
                error: error.message
            }
        }
    })

    ipcMain.on('renderView', (event, view) => {
        const filePath = path.join(__dirname, `views/${view}.html`);
        win.loadFile(filePath);
    })

    //Check if the app is already running
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length == 0) {
            createWindow()
        }
    })

    app.on("window-all-closed", () => {
        if (process.platform !== "darwin") {
            app.quit()
        }
    })

})