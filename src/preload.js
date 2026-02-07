const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
    // Inventories
    getInventory: () => ipcRenderer.invoke('getInventory'),
    setInventory: (data) => ipcRenderer.invoke('setInventory', data),
    getInventoryHistory: (id) => ipcRenderer.invoke('getInventoryHistory', id),
    updateInventory: (id, data) => ipcRenderer.invoke('updateInventory', id, data),

    // Publications
    getPublications: () => ipcRenderer.invoke('getPublications'),
    getPublication: (id) => ipcRenderer.invoke('getPublication', id),
    createPublication: (data) => ipcRenderer.invoke('createPublication', data),

    // Users
    getUsers: () => ipcRenderer.invoke('getUsers'),
    movementsUser: (id) => ipcRenderer.invoke('movementsUser', id),
    createUser: (data) => ipcRenderer.invoke('createUser', data),

    // Movements
    getMovements: () => ipcRenderer.invoke('getMovements'),
    createMovement: (data) => ipcRenderer.invoke('createMovement', data)
})

contextBridge.exposeInMainWorld('dom', {
    renderView: (view) => ipcRenderer.invoke('renderView', view)
})