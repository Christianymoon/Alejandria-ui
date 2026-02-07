import navigateTo from "../router.js";

export async function movementsView() {
    const container = document.createElement('div')
    const superiorPanel = document.createElement('div')
    superiorPanel.className = 'flex flex-col bg-neutral-50 justify-between pb-2 pt-2'
    superiorPanel.innerHTML = `
		<div class="flex flex-row pb-2 pt-2 gap-2">
			<h1 class="text-2xl font-semibold text-gray-900">Movimientos</h1>
		</div>
		<div class="flex flex-row gap-2">
			<button id="add-movement-button" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg hover:cursor-pointer">Agregar</button>
		</div>
	`

    container.appendChild(superiorPanel)
    const movements = await window.api.getMovements()
    movements.reverse().forEach(movement => {
        const movementElement = document.createElement('movement-card')
        movementElement.data = movement
        container.appendChild(movementElement)
    });


    const addMovementButton = container.querySelector('#add-movement-button')
    addMovementButton.addEventListener('click', () => {
        navigateTo('add-movement')
    })

    return container
}


export async function addMovementView() {
    const container = document.createElement('div')

    // Fetch users and publications
    const users = await window.api.getUsers()
    const publications = await window.api.getPublications()

    container.innerHTML = `
        <div class="flex flex-col gap-6 max-w-2xl mx-auto">
            <!-- Header Section -->
            <div class="flex items-center justify-between pb-4 border-b border-gray-200">
                <div>
                    <h1 class="text-3xl font-bold text-gray-900">Agregar Movimiento</h1>
                    <p class="text-sm text-gray-500 mt-1">Complete los campos para registrar un nuevo movimiento</p>
                </div>
            </div>

            <!-- Form Section -->
            <form id="add-movement-form" class="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                <div class="space-y-6">
                    <!-- User Field -->
                    <div class="flex flex-col gap-2">
                        <label for="user_id" class="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                            Usuario
                        </label>
                        <select 
                            id="user_id" 
                            name="user_id" 
                            required
                            class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 
                                   focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white
                                   transition-all duration-200 outline-none cursor-pointer
                                   hover:border-gray-300"
                        >
                            <option value="">Seleccione un usuario</option>
                            ${users.map(user => `<option value="${user.id}">${user.username}</option>`).join('')}
                        </select>
                    </div>

                    <!-- Publication Field -->
                    <div class="flex flex-col gap-2">
                        <label for="publication_id" class="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                            Publicación
                        </label>
                        <select 
                            id="publication_id" 
                            name="publication_id" 
                            required
                            class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 
                                   focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white
                                   transition-all duration-200 outline-none cursor-pointer
                                   hover:border-gray-300"
                        >
                            <option value="">Seleccione una publicación</option>
                            ${publications.map(pub => `<option value="${pub.id}">${pub.name}</option>`).join('')}
                        </select>
                    </div>

                    <!-- Quantity Field -->
                    <div class="flex flex-col gap-2">
                        <label for="quantity" class="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                            Cantidad
                        </label>
                        <input 
                            type="number" 
                            id="quantity" 
                            name="quantity" 
                            required
                            min="1"
                            placeholder="Ingrese la cantidad"
                            class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 
                                   focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white
                                   transition-all duration-200 outline-none
                                   hover:border-gray-300 placeholder-gray-400"
                        >
                    </div>

                    <!-- Movement Type Field -->
                    <div class="flex flex-col gap-2">
                        <label for="movement_type" class="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                            Tipo de Movimiento
                        </label>
                        <select 
                            id="movement_type" 
                            name="movement_type" 
                            required
                            class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 
                                   focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white
                                   transition-all duration-200 outline-none cursor-pointer
                                   hover:border-gray-300"
                        >
                            <option value="">Seleccione el tipo</option>
                            <option value="out">Salida</option>
                        </select>
                    </div>

                    <!-- Notes Field -->
                    <div class="flex flex-col gap-2">
                        <label for="notes" class="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                            Notas
                        </label>
                        <textarea 
                            id="notes" 
                            name="notes" 
                            rows="4"
                            placeholder="Ingrese notas o comentarios sobre el movimiento"
                            class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 
                                   focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white
                                   transition-all duration-200 outline-none resize-none
                                   hover:border-gray-300 placeholder-gray-400"
                        ></textarea>
                    </div>

                    <!-- Submit Buttons -->
                    <div class="flex gap-3 pt-4">
                        <button 
                            type="submit"
                            class="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700
                                   text-white font-semibold px-6 py-3 rounded-xl
                                   shadow-lg hover:shadow-xl hover:scale-[1.02] hover:cursor-pointer
                                   transition-all duration-200 ease-out
                                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Agregar Movimiento
                        </button>
                    </div>
                </div>
            </form>
        </div>
    `

    const form = container.querySelector('#add-movement-form')
    form.addEventListener('submit', async (e) => {
        e.preventDefault()
        const formData = new FormData(form)
        const data = {
            user_id: parseInt(formData.get('user_id')),
            publication_id: parseInt(formData.get('publication_id')),
            quantity: parseInt(formData.get('quantity')),
            movement_type: formData.get('movement_type'),
            notes: formData.get('notes')
        }

        try {
            await window.api.createMovement(data)
            alert('Movimiento agregado correctamente')
            navigateTo('movements')
        } catch (error) {
            console.error(error)
            alert('Error al agregar el movimiento')
        }
    })

    return container
}