import navigateTo from "../router.js"

export async function inventoryView() {
    const container = document.createElement('div')
    const publications = await window.api.getPublications()
    const superiorPanel = document.createElement('div')
    superiorPanel.className = 'flex flex-col bg-neutral-50 justify-between pb-2 pt-2'
    superiorPanel.innerHTML = `
        <div class="flex flex-row pb-2 pt-2 gap-2">
            <h1 class="text-2xl font-semibold text-gray-900">Inventario</h1>
        </div>
        <div class="flex flex-row gap-2">
            <button id="add-inventory" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg hover:cursor-pointer">Agregar</button>
        </div>
    `
    container.appendChild(superiorPanel)
    publications.forEach(publication => {
        const total_quantity = publication.inventory ? publication.inventory.total_quantity : 0
        const available_quantity = publication.inventory ? publication.inventory.available_quantity : 0
        const updated_at = publication.inventory ? new Date(publication.inventory.updated_at).toLocaleString('es-ES') : 'No disponible'
        const publicationCard = document.createElement('div')
        publicationCard.className = 'inventory-item group relative bg-white rounded-2xl shadow-md hover:shadow-2xl border border-gray-100 p-4 my-3 transition-all duration-300 hover:cursor-pointer hover:scale-[1.01] overflow-hidden'

        publicationCard.innerHTML = `
            <!-- Gradient Accent Bar -->
            <div class="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-blue-500 via-indigo-500 to-purple-500 group-hover:w-2 transition-all duration-300"></div>
            
            <div class="pl-3 flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
                <!-- Publication Name Badge -->
                <div class="flex-1">
                    <span class="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-semibold bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 border border-indigo-200 group-hover:from-indigo-100 group-hover:to-purple-100 transition-colors">
                        ${publication.name}
                    </span>
                </div>
                
                <!-- Stats Grid -->
                <div class="flex flex-wrap md:flex-nowrap items-start md:items-center gap-3 md:gap-6">
                    <!-- Total -->
                    <div class="flex items-center gap-2">
                        <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                        </svg>
                        <div>
                            <p class="text-xs text-gray-500 font-medium">Total</p>
                            <p class="text-base md:text-lg font-bold text-gray-900">${total_quantity}</p>
                        </div>
                    </div>
                    
                    <!-- Available -->
                    <div class="flex items-center gap-2 pl-0 md:pl-6 md:border-l border-gray-200">
                        <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        <div>
                            <p class="text-xs text-gray-500 font-medium">Disponibles</p>
                            <p class="text-base md:text-lg font-bold text-green-600">${available_quantity}</p>
                        </div>
                    </div>
                    
                    <!-- Updated -->
                    <div class="flex items-center gap-2 pl-0 md:pl-6 md:border-l border-gray-200">
                        <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        <div>
                            <p class="text-xs text-gray-500 font-medium">Actualizado</p>
                            <p class="text-xs font-medium text-gray-700">${updated_at}</p>
                        </div>
                    </div>
                </div>
            </div>
        `
        container.appendChild(publicationCard)
    })

    const addInventoryButton = container.querySelector('#add-inventory')
    addInventoryButton.addEventListener('click', async () => {
        navigateTo('add-inventory', { id: 'new' })
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
                            required
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
                            required
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
                                   shadow-lg hover:shadow-xl hover:scale-[1.02] hover:cursor-pointer
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
                                   focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2
                                   hover:cursor-pointer hover:bg-gray-200"
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