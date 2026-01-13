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
	set data(users) {
		if (!users) {
			return
		}
	}
}

customElements.define('pub-card', PubCard)
customElements.define('user-card', UsersCard)