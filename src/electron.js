const { app, BrowserWindow, ipcMain } = require('electron')
const { spawn } = require('child_process')
const axios = require('axios')
const path = require('node:path')



const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadFile(path.join(__dirname, 'index.html'))
}

// Función para esperar a que el servidor esté listo
const waitForServer = async (url = 'http://127.0.0.1:8000', maxAttempts = 30, delayMs = 1000) => {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            await axios.get(url)
            console.log('Servidor listo después de', attempt, 'intentos')
            return true
        } catch (error) {
            console.log(`Intento ${attempt}/${maxAttempts}: Esperando servidor...`)
            await new Promise(resolve => setTimeout(resolve, delayMs))
        }
    }
    throw new Error('El servidor no respondió después de ' + maxAttempts + ' intentos')
}

app.whenReady().then(async () => {
    let serverPath

    if (process.platform == 'darwin') {
        serverPath = path.join(__dirname, 'bin', 'server').replace('app.asar', 'app.asar.unpacked')
    } else {
        serverPath = path.join(__dirname, 'bin', 'run_server.exe').replace('app.asar', 'app.asar.unpacked')
    }

    const child = spawn(serverPath)

    try {
        await waitForServer()
        console.log('Servidor iniciado correctamente')
    } catch (error) {
        console.error('Error al iniciar el servidor:', error)
        app.quit()
        return
    }

    // Inventories

    ipcMain.handle('getInventory', async () => {
        const response = await axios.get('http://127.0.0.1:8000/inventory')
        return response.data
    })

    ipcMain.handle('setInventory', async (event, data) => {
        const response = await axios.post('http://127.0.0.1:8000/inventory', data)
        return response.data
    })

    ipcMain.handle('getInventoryHistory', async (event, id) => {
        const response = await axios.get(`http://127.0.0.1:8000/inventory/${id}/history`)
        return response.data
    })

    ipcMain.handle('updateInventory', async (event, id, data) => {
        const response = await axios.put(`http://127.0.0.1:8000/inventory/${id}`, data)
        return response.data
    })

    // Movements


    ipcMain.handle('getMovements', async () => {
        const response = await axios.get('http://127.0.0.1:8000/movements')
        return response.data
    })

    ipcMain.handle('createMovement', async (event, data) => {
        const response = await axios.post('http://127.0.0.1:8000/movements', data)
        return response.data
    })

    // Users

    ipcMain.handle('getUsers', async () => {
        const response = await axios.get('http://127.0.0.1:8000/users')
        return response.data
    })

    ipcMain.handle('createUser', async (event, data) => {
        const response = await axios.post('http://127.0.0.1:8000/users', data)
        return response.data
    })

    ipcMain.handle('movementsUser', async (event, id) => {
        const response = await axios.get(`http://127.0.0.1:8000/users/${id}/movements`)
        return response.data
    })

    ipcMain.handle('deleteUser', async (event, id) => {
        const response = await axios.delete(`http://127.0.0.1:8000/users/${id}`)
        return response.data
    })


    // Publications

    ipcMain.handle('getPublications', async () => {
        const response = await axios.get('http://127.0.0.1:8000/publications')
        return response.data
    })

    ipcMain.handle('getPublication', async (event, id) => {
        const response = await axios.get(`http://127.0.0.1:8000/publications/${id}`)
        return response.data
    })

    ipcMain.handle('createPublication', async (event, data) => {
        const response = await axios.post('http://127.0.0.1:8000/publications', data)
        return response.data
    })

    ipcMain.handle('deletePublication', async (event, id) => {
        const response = await axios.delete(`http://127.0.0.1:8000/publications/${id}`)
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
        child.kill()
    })

})