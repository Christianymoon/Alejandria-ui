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
			<div class="publication-item flex flex-row bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg hover:shadow-xl hover:bg-white/15 p-6 my-4 transition-all duration-300">
				<div>
				<div>
					<h2 class="text-lg font-semibold text-gray-900">${publications.name}</h2>
				</div>
				<div class="flex flex-col text-gray-700">
					<p>Año: ${publications.year}</p>
					<p>Mes: ${publications.month}</p>
					<p>Tipo: ${publications.type}</p>
					<p>Total: ${totalPubs}</p>
					<p>Disponibles: ${remainingPubs}</p>
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

		this.innerHTML = `
			<div class="movement-item flex flex-row bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg hover:shadow-xl hover:bg-white/15 p-6 my-4 transition-all duration-300">
				<div>
					<div>
						<h2 class="text-lg font-semibold text-gray-900">${movement.user.username}</h2>
					</div>
					<div class="flex flex-col text-gray-700">
						<p>Fecha: ${movement.timestamp}</p>
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

customElements.define('pub-card', PubCard)
customElements.define('user-card', UsersCard)
customElements.define('movement-card', MovementCard)