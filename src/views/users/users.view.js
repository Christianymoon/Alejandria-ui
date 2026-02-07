import navigateTo from "../router.js"

export async function usersView(params = {}) {
	const container = document.createElement('div')
	const superiorPanel = document.createElement('div')
	superiorPanel.className = 'flex flex-col bg-neutral-50 justify-between pb-2 pt-2'
	superiorPanel.innerHTML = `
		<div class="flex flex-row pb-2 pt-2 gap-2">
			<h1 class="text-2xl font-semibold text-gray-900">Usuarios</h1>
		</div>
		<div class="flex flex-row gap-2">
			<input id="searcher" class="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" type="text" placeholder="Buscar usuario">
			<button id="add-user-button" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg hover:cursor-pointer">Agregar</button>
		</div>
	`
	container.appendChild(superiorPanel)
	const users = await window.api.getUsers()
	users.forEach(user => {
		const userElement = document.createElement('user-card')
		userElement.data = user
		container.appendChild(userElement)
		userElement.addEventListener('click', () => {
			navigateTo('movements-user', { id: user.id, username: user.username })
		})
	});

	const addButton = container.querySelector('#add-user-button')
	addButton.addEventListener('click', () => {
		navigateTo('add-user')
	})

	const searcher = container.querySelector('#searcher')
	searcher.addEventListener('input', () => {
		const searchValue = searcher.value.toLowerCase()
		const users = container.querySelectorAll('.user-item')
		users.forEach(user => {
			const username = user.querySelector('#user-item__username').textContent.toLowerCase()
			if (username.includes(searchValue)) {
				user.style.display = 'block'
			} else {
				user.style.display = 'none'
			}
		})
	})

	return container
}


export async function addUsersView(params = {}) {
	const container = document.createElement('div')
	const roles = {
		1: 'Publicador',
		2: 'Precursor',
		3: 'Admin'
	}

	container.innerHTML = `
		<div class="flex flex-col gap-6 max-w-2xl mx-auto">
			<!-- Header Section -->
			<div class="flex items-center justify-between pb-4 border-b border-gray-200">
				<div>
					<h1 class="text-3xl font-bold text-gray-900">Agregar Usuario</h1>
					<p class="text-sm text-gray-500 mt-1">Complete los campos para agregar un nuevo usuario al sistema</p>
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
							<option value="1">Publicador</option>
							<option value="2">Precursor</option>
							<option value="3">Admin</option>
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
						<button 
							type="button"
							id="cancel-button"
							class="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl
								   transition-all duration-200 ease-out
								   focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2
								   hover:cursor-pointer"
						>
							Cancelar
						</button>
					</div>
				</div>
			</form>
		</div>
	`

	const form = container.querySelector('#add-user-form')
	form.addEventListener('submit', async (e) => {
		e.preventDefault()
		const formData = new FormData(form)
		const data = {
			username: formData.get('username'),
			role_id: parseInt(formData.get('role')),
			is_active: formData.get('check-active') === '1'
		}
		try {
			await window.api.createUser(data)
			alert('Usuario agregado correctamente')
			navigateTo('users')
		} catch (error) {
			alert('Error al agregar usuario')
		}
	})

	return container
}


export async function movementsUserView(params = {}) {
	const container = document.createElement('div')
	container.innerHTML = `
		<div class="flex flex-col gap-6 max-w-2xl mx-auto">
			<!-- Header Section -->
			<div class="flex items-center justify-between pb-4 border-b border-gray-200">
				<div>
					<h1 class="text-3xl font-bold text-gray-900">Movimientos de Usuario</h1>
					<p class="text-sm text-gray-500 mt-1">Nombre de usuario: ${params.username}</p>
					<p class="text-sm text-gray-500 mt-1">id del usuario: ${params.id}</p>
				</div>
			</div>
		</div>
	`

	const movements = await window.api.movementsUser(params.id)

	movements[0].movements.forEach(movement => {
		const movementElement = document.createElement('movement-user-card')
		movementElement.data = movement
		container.appendChild(movementElement)
	})

	return container
}