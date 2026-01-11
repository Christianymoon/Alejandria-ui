const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
    getInventory: () => ipcRenderer.invoke('getInventory'),
    getPublications: () => ipcRenderer.invoke('getPublications')
})


contextBridge.exposeInMainWorld('electronapi', {
    renderView: (view) => ipcRenderer.send('renderView', view)
})