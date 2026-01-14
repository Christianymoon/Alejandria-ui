const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
    getInventory: () => ipcRenderer.invoke('getInventory'),
    getPublications: () => ipcRenderer.invoke('getPublications'),
    getUsers: () => ipcRenderer.invoke('getUsers'),
    getMovements: () => ipcRenderer.invoke('getMovements')
})

contextBridge.exposeInMainWorld('dom', {
    renderView: (view) => ipcRenderer.invoke('renderView', view)
})