const { app, BrowserWindow, ipcMain } = require('electron')
const axios = require('axios')
const path = require('node:path')
const fs = require('node:fs')

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

    ipcMain.handle('getUsers', async () => {
        const response = await axios.get('http://127.0.0.1:8000/users')
        return response.data
    })

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

    ipcMain.handle('renderView', async (event, view) => {
        try {
            const filePath = path.join(__dirname, `views/${view}.html`);
            const html = fs.readFileSync(filePath, 'utf-8');
            return html;
        } catch (error) {
            console.error('Error loading view:', error);
            return `<div class="p-8"><h1 class="text-2xl font-bold text-red-600">Error loading view: ${view}</h1></div>`;
        }
    })

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