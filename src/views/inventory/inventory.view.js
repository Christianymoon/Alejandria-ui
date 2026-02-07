import navigateTo from "../router.js"
import { Header } from "../../components/headers.js"
import { InventoryForm } from "../../components/forms.js"

export async function inventoryView(params = {}) {
    const container = document.createElement('div')
    const inventories = await window.api.getPublications()
    const header = Header({
        title: 'Inventario',
        description: 'Aquí puedes ver todos los inventarios',
        button: {
            id: 'add-inventory-button',
            text: 'Agregar',
            event: 'click',
            color: 'bg-blue-500',
            hover: 'blue-600',
            action: async () => await navigateTo('add-inventory')
        }
    })
    container.appendChild(header)

    inventories.forEach(inventory => {
        const inventoryElement = document.createElement('new-inventory-card')
        inventoryElement.data = inventory
        container.appendChild(inventoryElement)
        inventoryElement.addEventListener('click', () => {
            navigateTo('inventory-history', { id: inventory.id })
        })
    })

    return container
}

export async function InventoryHistoryView(params = {}) {
    const container = document.createElement('div')
    const history = await window.api.getInventoryHistory(params.id)
    const header = Header({
        title: 'Historial de Actualizaciones',
        description: 'Aquí puedes ver todo el Historial de Inventarios',
    })
    container.appendChild(header)
    history.reverse().forEach(item => {
        const historyCard = document.createElement('history-card')
        historyCard.data = item
        container.appendChild(historyCard)
    })

    return container
}

export async function addInventoryView(params = {}) {
    const container = document.createElement('div')
    const publications = await window.api.getPublications()
    container.className = 'flex flex-col bg-neutral-50 justify-between p-5'
    container.innerHTML = InventoryForm({
        publications: publications
    })
    const form = container.querySelector('#add-inventory-form')
    form.addEventListener('submit', async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const data = {
            publication_id: parseInt(formData.get('publication_id')),
            total_quantity: parseInt(formData.get('total_quantity')),
            available_quantity: parseInt(formData.get('available_quantity'))
        }
        try {
            await window.api.setInventory(data)
            alert('Inventario actualizado')
        } catch (error) {
            const publication = await window.api.getPublication(data.publication_id)
            const inventory_id = publication.inventory.id
            const inventoryData = {
                total_quantity: data.total_quantity,
                available_quantity: data.available_quantity
            }
            await window.api.updateInventory(inventory_id, inventoryData)
            alert('Inventario actualizado')
        }
    })
    return container
}

