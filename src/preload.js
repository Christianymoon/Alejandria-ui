const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
    getInventory: () => ipcRenderer.invoke('getInventory'),
    setInventory: (data) => ipcRenderer.invoke('setInventory', data),
    getInventoryHistory: (id) => ipcRenderer.invoke('getInventoryHistory', id),
    updateInventory: (data) => ipcRenderer.invoke('updateInventory', data),
    getPublications: () => ipcRenderer.invoke('getPublications'),
    getPublication: (id) => ipcRenderer.invoke('getPublication', id),
    createPublication: (data) => ipcRenderer.invoke('createPublication', data),
    getUsers: () => ipcRenderer.invoke('getUsers'),
    movementsUser: (id) => ipcRenderer.invoke('movementsUser', id),
    createUser: (data) => ipcRenderer.invoke('createUser', data),
    getMovements: () => ipcRenderer.invoke('getMovements'),
    createMovement: (data) => ipcRenderer.invoke('createMovement', data)
})

contextBridge.exposeInMainWorld('dom', {
    renderView: (view) => ipcRenderer.invoke('renderView', view)
})