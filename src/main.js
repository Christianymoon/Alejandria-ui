const { app, BrowserWindow, ipcMain } = require('electron')
const axios = require('axios')
const path = require('node:path')
const fs = require('node:fs')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadFile('index.html')
}

app.whenReady().then(() => {
    // Register all IPC handlers AFTER app is ready but BEFORE creating window
    ipcMain.handle('getMovements', async () => {
        const response = await axios.get('http://127.0.0.1:8000/movements')
        return response.data
    })

    ipcMain.handle('createMovement', async (event, data) => {
        const response = await axios.post('http://127.0.0.1:8000/movements', data)
        return response.data
    })

    ipcMain.handle('getUsers', async () => {
        const response = await axios.get('http://127.0.0.1:8000/users')
        return response.data
    })

    ipcMain.handle('createUser', async (event, data) => {
        const response = await axios.post('http://127.0.0.1:8000/users', data)
        return response.data
    })

    ipcMain.handle('getInventory', async () => {
        const response = await axios.get('http://127.0.0.1:8000/inventory')
        return response.data
    })

    ipcMain.handle('setInventory', async (event, data) => {
        const response = await axios.post('http://127.0.0.1:8000/inventory', data)
        return response.data
    })

    ipcMain.handle('getInventoryHistory', async (event, id) => {
        const response = await axios.get(`http://127.0.0.1:8000/inventory/history/${id}`)
        return response.data
    })

    ipcMain.handle('getPublications', async () => {
        const response = await axios.get('http://127.0.0.1:8000/publications')
        return response.data
    })

    ipcMain.handle('getPublication', async (event, id) => {
        const response = await axios.get(`http://127.0.0.1:8000/publications/view/${id}`)
        return response.data
    })

    ipcMain.handle('createPublication', async (event, data) => {
        const response = await axios.post('http://127.0.0.1:8000/publications', data)
        return response.data
    })

    ipcMain.handle('movementsUser', async (event, id) => {
        const response = await axios.get(`http://127.0.0.1:8000/movements/user/${id}`)
        return response.data
    })

    createWindow()

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