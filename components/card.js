class UseCard extends HTMLElement {
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
			<div class="publication-item flex flex-row bg-blue-900 p-4 my-4">
				<div>
				<div>
					<h2 class="text-lg font-semibold">${publications.name}</h2>
				</div>
				<div class="flex flex-col text-neutral-200">
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

customElements.define('user-card', UseCard)