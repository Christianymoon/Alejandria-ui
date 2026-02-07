import navigateTo from "../router.js"
import { UserForm } from "../../components/forms.js"
import { Header } from "../../components/headers.js"

export async function usersView(params = {}) {
	const container = document.createElement('div')
	const users = await window.api.getUsers()
	const header = Header({
		title: 'Usuarios',
		description: 'Usuarios del sistema',
		button: {
			id: 'add-user-button',
			text: 'Agregar',
			event: 'click',
			color: 'bg-blue-500',
			hover: 'blue-600',
			action: async () => {
				await navigateTo('add-user')
			}
		},
		searcher: {
			id: 'searcher',
			placeholder: 'Buscar usuario',
			event: 'input',
			action: (e) => {
				const searchValue = e.target.value.toLowerCase()
				const users = container.querySelectorAll('.user-item')
				users.forEach(user => {
					const username = user.querySelector('#user-item__username').textContent.toLowerCase()
					if (username.includes(searchValue)) {
						user.style.display = 'block'
					} else {
						user.style.display = 'none'
					}
				})
			}
		}
	})

	container.appendChild(header)

	users.forEach(user => {
		const userElement = document.createElement('user-card')
		userElement.data = user
		container.appendChild(userElement)
		userElement.addEventListener('click', () => {
			navigateTo('movements-user', { id: user.id, username: user.username })
		})
	});


	return container
}

export async function movementsUserView(params = {}) {
	const container = document.createElement('div')
	const movements = await window.api.movementsUser(params.id)
	const header = Header({
		title: `Movimientos de ${params.username}`,
		description: 'Movimientos del usuario',
		button: {
			id: 'delete-user-button',
			text: 'Eliminar Usuario',
			event: 'click',
			color: 'bg-red-500',
			hover: 'red-600',
			modal: {
				title: 'Eliminar Usuario',
				description: '¿Está seguro de que desea eliminar este usuario?',
				confirmText: 'Eliminar',
				cancelText: 'Cancelar'
			},
			action: async () => {
				try {
					await window.api.deleteUser(params.id)
					alert('Usuario eliminado correctamente')
					navigateTo('users')
				} catch (error) {
					alert('Error al eliminar usuario')
				}
			}
		}
	})

	container.appendChild(header)

	movements.reverse().forEach(movement => {
		const movementElement = document.createElement('movement-user-card')
		movementElement.data = movement
		container.appendChild(movementElement)
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

	container.innerHTML = UserForm({
		header: 'Agregar Usuario',
		description: 'Complete los campos para agregar un nuevo usuario al sistema',
		options: Object.entries(roles).map(([value, label]) => ({ value, label }))
	})

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


