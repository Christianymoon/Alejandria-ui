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
			<div id="${publications.id}" class="publication-item group relative bg-white rounded-2xl shadow-md hover:shadow-2xl border border-gray-100 p-5 my-3 transition-all duration-300 hover:cursor-pointer hover:scale-[1.02] hover:-translate-y-1 overflow-hidden">
				<!-- Gradient Accent Bar -->
				<div class="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 group-hover:w-2 transition-all duration-300"></div>
				
				<div class="flex items-center justify-between">
					<div class="flex-1 pl-3">
						<h2 class="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">${publications.name}</h2>
						<div class="flex items-center gap-2">
							<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 border border-indigo-200">
								<svg class="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"/>
								</svg>
								${publications.code}
							</span>
							${totalPubs !== 'Sin inventario aun' ? `
								<span class="text-xs font-medium text-gray-500">
									<span class="text-indigo-600 font-semibold">${remainingPubs}</span> / ${totalPubs}
								</span>
							` : ''}
						</div>
					</div>
					
					<!-- Arrow Icon -->
					<div class="flex-shrink-0 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
						<svg class="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
						</svg>
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
			<div id="${user.id}" class="user-item group relative bg-white rounded-2xl shadow-md hover:shadow-2xl border border-gray-100 p-5 my-3 transition-all duration-300 hover:cursor-pointer hover:scale-[1.02] hover:-translate-y-1 overflow-hidden">
				<!-- Gradient Accent Bar -->
				<div class="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-emerald-400 via-teal-500 to-cyan-600 group-hover:w-2 transition-all duration-300"></div>
				
				<div class="pl-4 flex items-center justify-between">
					<div class="flex-1">
						<div class="flex items-center gap-3 mb-1">
							<h2 id="user-item__username" class="text-lg font-bold text-gray-900 group-hover:text-teal-600 transition-colors">${user.username}</h2>
							<span id="user-item__role" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-50 text-teal-700 border border-teal-200">
								${user.role.name}
							</span>
						</div>
						<div class="flex items-center gap-4 text-xs text-gray-500 font-medium">
							<span class="flex items-center gap-1">
								<svg class="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
								</svg>
								ID: ${user.id}
							</span>
						</div>
					</div>

					<div class="flex items-center gap-6 mr-4">
						<div class="text-right">
							<p class="text-[10px] uppercase tracking-wider text-gray-500 font-bold mb-0.5">Publicaciones</p>
							<div class="flex items-center justify-end gap-1.5">
								<svg class="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
								</svg>
								<span id="user-item__publications" class="text-xl font-bold text-gray-900">22</span>
							</div>
						</div>
					</div>
					
					<!-- Arrow -->
					<div class="flex-shrink-0 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
						<svg class="w-5 h-5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
						</svg>
					</div>
				</div>
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
			<div class="movement-item group relative bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-100 p-4 my-2 transition-all duration-300 hover:cursor-pointer hover:scale-[1.01] overflow-hidden">
				<!-- Gradient Accent Bar -->
				<div class="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-orange-400 via-pink-500 to-rose-500 group-hover:w-2 transition-all duration-300"></div>

				<div class="pl-4 flex items-center gap-4">
					<!-- User & Date Info -->
					<div class="w-1/4 min-w-[140px]">
						<div class="flex items-center gap-2 mb-1">
							<svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
							</svg>
							<h3 class="text-sm font-bold text-gray-900 truncate">${movement.user.username}</h3>
						</div>
						<p class="text-xs text-gray-500 pl-6">${formattedDate}</p>
					</div>

					<!-- Movement Type Badge -->
					<div class="w-24 flex-shrink-0">
						<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${movement.movement_type === 'in' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'}">
							<svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${movement.movement_type === 'in' ? 'M19 14l-7 7m0 0l-7-7m7 7V3' : 'M5 10l7-7m0 0l7 7m-7-7v18'}"/>
							</svg>
							${movement.movement_type === 'in' ? 'Entrada' : 'Salida'}
						</span>
					</div>

					<!-- Quantity -->
					<div class="w-20 flex-shrink-0 text-center border-l border-gray-100 px-3">
						<p class="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Cant</p>
						<p class="text-lg font-bold text-gray-900">${movement.quantity}</p>
					</div>

					<!-- Notes -->
					<div class="flex-1 border-l border-gray-100 pl-4">
						<div class="flex items-center gap-1.5 mb-0.5">
							<svg class="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"/>
							</svg>
							<span class="text-xs font-semibold text-gray-500 uppercase tracking-wide">Notas</span>
						</div>
						<p class="text-xs text-gray-600 truncate max-w-xs" title="${movement.notes}">${movement.notes}</p>
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
			<div class="inventory-item group relative bg-white rounded-2xl shadow-md hover:shadow-2xl border border-gray-100 p-6 my-3 transition-all duration-300 hover:cursor-pointer hover:scale-[1.02] hover:-translate-y-1 overflow-hidden">
				<!-- Gradient Accent Bar -->
				<div class="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-blue-500 via-indigo-500 to-purple-500 group-hover:w-2 transition-all duration-300"></div>
				
				<div class="pl-4">
					<!-- Header -->
					<div class="flex items-center justify-between mb-4">
						<div class="flex-1">
							<h2 class="text-xl font-bold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors">${publication.name}</h2>
							<div class="flex items-center gap-2 flex-wrap">
								<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 border border-indigo-200">
									<svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"/>
									</svg>
									${publication.code}
								</span>
								<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
									${publication.type}
								</span>
								<span class="text-xs text-gray-500 font-medium">${publication.month} ${publication.year}</span>
							</div>
						</div>
						<!-- Arrow Icon -->
						<div class="flex-shrink-0 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
							<svg class="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
							</svg>
						</div>
					</div>
					
					<!-- Inventory Info Grid -->
					<div class="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
						<div class="text-center">
							<div class="flex items-center justify-center mb-1">
								<svg class="w-4 h-4 text-gray-400 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
								</svg>
								<p class="text-xs font-semibold text-gray-500 uppercase tracking-wide">Total</p>
							</div>
							<p class="text-2xl font-bold text-gray-900">${total_quantity}</p>
						</div>
						<div class="text-center border-l border-r border-gray-100">
							<div class="flex items-center justify-center mb-1">
								<svg class="w-4 h-4 text-green-500 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
								</svg>
								<p class="text-xs font-semibold text-gray-500 uppercase tracking-wide">Disponibles</p>
							</div>
							<p class="text-2xl font-bold text-green-600">${available_quantity}</p>
						</div>
						<div class="text-center">
							<div class="flex items-center justify-center mb-1">
								<svg class="w-4 h-4 text-gray-400 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
								</svg>
								<p class="text-xs font-semibold text-gray-500 uppercase tracking-wide">Actualizado</p>
							</div>
							<p class="text-xs font-medium text-gray-700 mt-1.5">${updated_at}</p>
						</div>
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