import navigateTo from "../router.js"

export async function inventoryView() {
    const container = document.createElement('div')
    const publications = await window.api.getPublications()
    const superiorPanel = document.createElement('div')
    superiorPanel.className = 'flex flex-col bg-neutral-50 justify-between p-5'
    superiorPanel.innerHTML = `
        <div class="flex flex-row pb-2 pt-2 gap-2">
            <h1 class="text-2xl font-semibold text-gray-900">Inventario</h1>
        </div>
        <div class="flex flex-row gap-2">
            <button id="add-inventory" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg hover:cursor-pointer">Agregar</button>
            <button id="edit-inventory" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg hover:cursor-pointer">Editar</button>
            <button id="delete-inventory" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg hover:cursor-pointer">Eliminar</button>
        </div>
    `
    container.appendChild(superiorPanel)
    publications.forEach(publication => {
        const total_quantity = publication.inventory ? publication.inventory.total_quantity : 0
        const available_quantity = publication.inventory ? publication.inventory.available_quantity : 0
        const updated_at = publication.inventory ? new Date(publication.inventory.updated_at).toLocaleString('es-ES') : 'No disponible'
        const publicationCard = document.createElement('div')
        publicationCard.className = 'inventory-item flex flex-row bg-white/10 justify-between backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg hover:shadow-xl hover:bg-white/15 p-2 my-2 transition-all duration-300'

        publicationCard.innerHTML = `
            <h2 class="text-sm font-semibold text-gray-900 w-1/4 p-2">${publication.name}</h2>
            <p class="text-sm font-semibold text-gray-900 w-1/4 p-2">Total: ${total_quantity}</p>
            <p class="text-sm font-semibold text-gray-900 w-1/4 p-2">Disponibles: ${available_quantity}</p>
            <p class="text-sm font-semibold text-gray-900 w-1/4 p-2">Actualizado: ${updated_at}</p>
        `

        container.appendChild(publicationCard)
    })

    const addInventoryButton = container.querySelector('#add-inventory')
    addInventoryButton.addEventListener('click', async () => {
        navigateTo('add-inventory', { id: 'new' })
    })

    const editInventoryButton = container.querySelector('#edit-inventory')
    editInventoryButton.addEventListener('click', async () => {
        navigateTo('edit-inventory', { id: 'new' })
    })

    const deleteInventoryButton = container.querySelector('#delete-inventory')
    deleteInventoryButton.addEventListener('click', async () => {
        navigateTo('delete-inventory', { id: 'new' })
    })

    return container
}

export async function addInventoryView() {
    const container = document.createElement('div')
    const publications = await window.api.getPublications()
    container.className = 'flex flex-col bg-neutral-50 justify-between p-5'
    container.innerHTML = `
        <div class="flex flex-col gap-6 max-w-2xl mx-auto">
            <!-- Header Section -->
            <div class="flex items-center justify-between pb-4 border-b border-gray-200">
                <div>
                    <h1 class="text-3xl font-bold text-gray-900">Agregar Inventario</h1>
                    <p class="text-sm text-gray-500 mt-1">Complete los campos para agregar un nuevo registro de inventario</p>
                </div>
            </div>

            <!-- Form Section -->
            <form id="add-inventory-form" class="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                <div class="space-y-6">
                    <!-- Publication Field -->
                    <div class="flex flex-col gap-2">
                        <label for="publication_id" class="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                            Publicación
                        </label>
                        <select 
                            name="publication_id" 
                            id="publication_id"
                            class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 
                                   focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white
                                   transition-all duration-200 outline-none cursor-pointer
                                   hover:border-gray-300"
                        >
                            <option value="">Seleccione una publicación</option>
                            ${publications.map(publication => `<option value="${publication.id}">${publication.name}</option>`).join('')}
                        </select>
                    </div>

                    <!-- Quantity Field -->
                    <div class="flex flex-col gap-2">
                        <label for="quantity" class="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                            Cantidad
                        </label>
                        <input 
                            type="number" 
                            name="total_quantity" 
                            id="total_quantity"
                            min="0"
                            placeholder="Ingrese la cantidad"
                            class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 
                                   focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white
                                   transition-all duration-200 outline-none
                                   hover:border-gray-300 placeholder-gray-400"
                        >
                    </div>

                    <div class="flex flex-col gap-2">
                        <label for="available_quantity" class="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                            Disponibles
                        </label>
                        <input 
                            type="number" 
                            name="available_quantity" 
                            id="available_quantity"
                            min="0"
                            placeholder="Ingrese la disponibilidad"
                            class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 
                                   focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white
                                   transition-all duration-200 outline-none
                                   hover:border-gray-300 placeholder-gray-400"
                        >
                    </div>

                    <!-- Submit Button -->
                    <div class="flex gap-3 pt-4">
                        <button 
                            type="submit"
                            class="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700
                                   text-white font-semibold px-6 py-3 rounded-xl
                                   shadow-lg hover:shadow-xl hover:scale-[1.02]
                                   transition-all duration-200 ease-out
                                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Acutalizar
                        </button>
                        <button 
                            type="button"
                            id="cancel-button"
                            class="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl
                                   transition-all duration-200 ease-out
                                   focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </form>
        </div>
    `

    const form = container.querySelector('#add-inventory-form')
    form.addEventListener('submit', async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const data = {
            publication_id: parseInt(formData.get('publication_id')),
            total_quantity: parseInt(formData.get('total_quantity')),
            available_quantity: parseInt(formData.get('available_quantity'))
        }

        console.log(data)

        await window.api.setInventory(data)
        alert('Inventario actualizado')
    })
    return container
}