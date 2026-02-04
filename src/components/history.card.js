class HistoryCard extends HTMLElement {
	set data(history) {
		if (!history) {
			return
		}

		const updated_at = history.updated_at ? new Date(history.updated_at).toLocaleString('es-MX') : 'No disponible'

		this.innerHTML = `
			<div class="history-item group relative bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-100 p-4 my-2 transition-all duration-300 hover:cursor-pointer hover:scale-[1.01] overflow-hidden">
				<!-- Gradient Accent Bar -->
				<div class="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-amber-400 via-orange-500 to-red-500 group-hover:w-2 transition-all duration-300"></div>
				
				<div class="pl-4 flex items-center gap-4">
					<!-- History Icon -->
					<div class="flex-shrink-0">
						<svg class="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
						</svg>
					</div>

					<!-- Total Quantity -->
					<div class="flex-1 min-w-[100px]">
						<p class="text-[10px] uppercase tracking-wider text-gray-500 font-bold mb-0.5">Total</p>
						<div class="flex items-center gap-1.5">
							<svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
							</svg>
							<span class="text-lg font-bold text-gray-900">${history.total_quantity}</span>
						</div>
					</div>

					<!-- Available Quantity -->
					<div class="flex-1 min-w-[100px] border-l border-gray-100 pl-4">
						<p class="text-[10px] uppercase tracking-wider text-gray-500 font-bold mb-0.5">Disponibles</p>
						<div class="flex items-center gap-1.5">
							<svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
							</svg>
							<span class="text-lg font-bold text-green-600">${history.available_quantity}</span>
						</div>
					</div>

					<!-- Updated At -->
					<div class="flex-1 min-w-[140px] border-l border-gray-100 pl-4">
						<p class="text-[10px] uppercase tracking-wider text-gray-500 font-bold mb-0.5">Actualizado</p>
						<div class="flex items-center gap-1.5">
							<svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
							</svg>
							<span class="text-xs font-medium text-gray-700">${updated_at}</span>
						</div>
					</div>
				</div>
			</div>
		`
	}
}

customElements.define('history-card', HistoryCard)
