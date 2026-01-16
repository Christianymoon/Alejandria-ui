const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
    getInventory: () => ipcRenderer.invoke('getInventory'),
    setInventory: (data) => ipcRenderer.invoke('setInventory', data),
    getPublications: () => ipcRenderer.invoke('getPublications'),
    getPublication: (id) => ipcRenderer.invoke('getPublication', id),
    createPublication: (data) => ipcRenderer.invoke('createPublication', data),
    getUsers: () => ipcRenderer.invoke('getUsers'),
    getMovements: () => ipcRenderer.invoke('getMovements'),
})

contextBridge.exposeInMainWorld('dom', {
    renderView: (view) => ipcRenderer.invoke('renderView', view)
})