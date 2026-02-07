export function UserForm(params = {}) {

	const header = params.header || 'Agregar Usuario'
	const description = params.description || 'Complete los campos para agregar un nuevo usuario al sistema'
	const options = params.options || []

	return `<div class="flex flex-col gap-6 max-w-2xl mx-auto">
			<!-- Header Section -->
			<div class="flex items-center justify-between pb-4 border-b border-gray-200">
				<div>
					<h1 class="text-3xl font-bold text-gray-900">${header}</h1>
					<p class="text-sm text-gray-500 mt-1">${description}</p>
				</div>
			</div>

			<!-- Form Section -->
			<form id="add-user-form" class="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
				<div class="space-y-6">
					<!-- Username Field -->
					<div class="flex flex-col gap-2">
						<label for="username" class="text-sm font-semibold text-gray-700 uppercase tracking-wide">
							Nombre de Usuario
						</label>
						<input 
							type="text" 
							id="username" 
							name="username" 
							required
							placeholder="Ingrese el nombre de usuario"
							class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 
								   focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white
								   transition-all duration-200 outline-none
								   hover:border-gray-300 placeholder-gray-400"
						>
					</div>

					<!-- Role Field -->
					<div class="flex flex-col gap-2">
						<label for="role" class="text-sm font-semibold text-gray-700 uppercase tracking-wide">
							Rol
						</label>
						<select 
							id="role" 
							name="role" 
							required
							class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 
								   focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white
								   transition-all duration-200 outline-none cursor-pointer
								   hover:border-gray-300"
						>
							${options.map(option => `<option value="${option.value}">${option.label}</option>`).join('')}
						</select>
					</div>

					<div class="check-active">
						<input type="checkbox" id="check-active" checked value="1" name="check-active">
						<label for="check-active">Activo</label>
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
							Agregar Usuario
						</button>
					</div>
				</div>
			</form>
		</div>
	`
}

export function PublicationForm(params = {}) {
	const header = params.header || 'Agregar Publicación'
	const description = params.description || 'Complete los campos para agregar una nueva publicación al sistema'

	return `
		<div class="flex flex-col gap-6 max-w-2xl mx-auto">
			<!-- Header Section -->
			<div class="flex items-center justify-between pb-4 border-b border-gray-200">
				<div>
					<h1 class="text-3xl font-bold text-gray-900">${header}</h1>
					<p class="text-sm text-gray-500 mt-1">${description}</p>
				</div>
			</div>

			<!-- Form Section -->
			<form id="add-publication-form" class="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
				<div class="space-y-6">
					<!-- Name Field -->
					<div class="flex flex-col gap-2">
						<label for="name" class="text-sm font-semibold text-gray-700 uppercase tracking-wide">
							Nombre
						</label>
						<input 
							type="text" 
							id="name" 
							name="name" 
							required
							placeholder="Ingrese el nombre de la publicación"
							class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 
								   focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white
								   transition-all duration-200 outline-none
								   hover:border-gray-300 placeholder-gray-400"
						>
					</div>

					<!-- Year Field -->
					<div class="flex flex-col gap-2">
						<label for="year" class="text-sm font-semibold text-gray-700 uppercase tracking-wide">
							Año
						</label>
						<input 
							type="number" 
							id="year" 
							name="year" 
							required
							min="1900"
							max="2100"
							placeholder="Ingrese el año"
							class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 
								   focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white
								   transition-all duration-200 outline-none
								   hover:border-gray-300 placeholder-gray-400"
						>
					</div>

					<!-- Month Field -->
					<div class="flex flex-col gap-2">
						<label for="month" class="text-sm font-semibold text-gray-700 uppercase tracking-wide">
							Mes
						</label>
						<input 
							type="text" 
							id="month" 
							name="month" 
							required
							placeholder="Ingrese el mes"
							class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 
								   focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white
								   transition-all duration-200 outline-none
								   hover:border-gray-300 placeholder-gray-400"
						>
					</div>

					<!-- Type Field -->
					<div class="flex flex-col gap-2">
						<label for="type" class="text-sm font-semibold text-gray-700 uppercase tracking-wide">
							Tipo
						</label>
						<input 
							type="text" 
							id="type" 
							name="type" 
							required
							placeholder="Ingrese el tipo de publicación"
							class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 
								   focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white
								   transition-all duration-200 outline-none
								   hover:border-gray-300 placeholder-gray-400"
						>
					</div>

					<!-- Code Field -->
					<div class="flex flex-col gap-2">
						<label for="code" class="text-sm font-semibold text-gray-700 uppercase tracking-wide">
							Código
						</label>
						<input 
							type="text" 
							id="code" 
							name="code" 
							required
							placeholder="Ingrese el código de la publicación"
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
							Agregar Publicación
						</button>
					</div>
				</div>
			</form>
		</div>
	`
}

export function MovementsForm(params = {}) {
	const header = params.header || 'Agregar Movimiento'
	const description = params.description || 'Complete los campos para agregar un nuevo movimiento al sistema'
	const users = params.users || []
	const publications = params.publications || []

	return `
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
}

export function InventoryForm(params = {}) {
	const header = params.header || 'Agregar Inventario'
	const description = params.description || 'Complete los campos para agregar un nuevo registro de inventario'
	const publications = params.publications || []

	return `
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
                            Agregar
                        </button>
                    </div>
                </div>
            </form>
        </div>
    `
}