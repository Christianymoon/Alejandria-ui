class PubCard extends HTMLElement {
	set data(publications) {
		if (!publications) {
			return
		}

		const totalPubs = publications.inventory
			? publications.inventory.total_quantity
			: 'Sin inventario aun'

		const remainingPubs = publications.inventory
			? publications.inventory.available_quantity
			: 'No disponible'

		this.innerHTML = `
			<div id="${publications.id}" class="publication-item flex flex-row bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg hover:shadow-xl hover:bg-white/15 p-6 my-4 transition-all duration-300
			hover:cursor-pointer">
				<div>
				<div>
					<h2 class="text-lg font-semibold text-gray-900">${publications.name}</h2>
				</div>
				<div class="flex flex-col text-gray-700">
					<p>${publications.code}</p>
				</div>
				</div>
				
			</div>
		`
	}
}

class UsersCard extends HTMLElement {
	set data(user) {
		if (!user) {
			return
		}

		this.innerHTML = `
			<div id="${user.id}" class="user-item flex flex-col bg-neutral-200 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg hover:shadow-xl hover:bg-white/15 p-6 my-4 transition-all duration-300">
				<table>
					<thead>
						<tr class="user-header uppercase">
							<th class="text-left">Nombre</th>
							<th class="text-left">Role</th>
							<th class="text-left">Pubs</th>
						</tr>
					</thead>
					<tr>
						<td class="user-name w-1/2 pr-2">${user.username}</td>
						<td class="user-role w-1/2 pr-2">${user.role.name}</td>
						<td class="user-pubs w-1/2 pr-2">22</td>
					</tr>
				</table>
			</div>
		`
	}
}

class MovementCard extends HTMLElement {
	set data(movement) {
		if (!movement) {
			return
		}

		const date = new Date(movement.timestamp)
		const formattedDate = date.toLocaleString('es-ES')

		this.innerHTML = `
			<div class="movement-item flex flex-row bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg hover:shadow-xl hover:bg-white/15 p-6 my-4 transition-all duration-300">
				<div>
					<div>
						<h2 class="text-lg font-semibold text-gray-900">${movement.user.username}</h2>
					</div>
					<div class="flex flex-col text-gray-700">
						<p>Fecha: ${formattedDate}</p>
						<p>Cantidad: ${movement.quantity}</p>
						<p>Tipo: ${movement.movement_type}</p>
						<p>Notas: ${movement.notes}</p>
						<p>Publicacion: ${movement.publication_id}</p>
					</div>
				</div>
			</div>
		`
	}
}

class InventoryCard extends HTMLElement {
	set data(publication) {
		if (!publication) {
			return
		}

		let updated_at = '0'
		let total_quantity = '0'
		let available_quantity = '0'
		if (publication.inventory) {
			updated_at = new Date(publication.inventory.updated_at).toLocaleString('es-ES')
			total_quantity = publication.inventory.total_quantity
			available_quantity = publication.inventory.available_quantity
		}

		this.innerHTML = `
			<div class="inventory-item flex flex-row bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg hover:shadow-xl hover:bg-white/15 p-6 my-4 transition-all duration-300">
				<div>
					<div>
						<h2 class="text-lg font-semibold text-gray-900">${publication.name}</h2>
					</div>
					<div class="flex flex-col text-gray-700">
						<p>ID: ${publication.id}</p>
						<p>Tipo: ${publication.type}</p>
						<p>Año: ${publication.year}</p>
						<p>Mes: ${publication.month}</p>
						<p>Codigo: ${publication.code}</p>
						<p>Totales: ${total_quantity}</p>
						<p>Disponibles: ${available_quantity}</p>
						<p>Actualizado: ${updated_at}</p>
					</div>
				</div>
			</div>
		`
	}
}

customElements.define('pub-card', PubCard)
customElements.define('user-card', UsersCard)
customElements.define('movement-card', MovementCard)
customElements.define('inventory-card', InventoryCard)