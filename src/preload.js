const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
    getInventory: () => ipcRenderer.invoke('getInventory'),
    getPublications: () => ipcRenderer.invoke('getPublications'),
    getUsers: () => ipcRenderer.invoke('getUsers')
})

contextBridge.exposeInMainWorld('dom', {
    renderView: (view) => ipcRenderer.invoke('renderView', view)
})