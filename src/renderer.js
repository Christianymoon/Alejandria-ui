const navItems = document.querySelectorAll('.nav-item')
const content = document.getElementById('content')

function updateActiveStates(activeId) {
	// Remove active states from all items
	document.querySelectorAll('.nav-item').forEach(item => {
		item.classList.remove('active-nav', 'active-nav-mobile')
		// Reset colors for inactive items
		const svg = item.querySelector('svg')
		const span = item.querySelector('span')
		if (svg) svg.classList.remove('text-indigo-600')
		if (svg) svg.classList.add('text-gray-400', 'md:text-gray-500')
		if (span) span.classList.remove('text-indigo-600')
		if (span) span.classList.add('text-gray-400', 'md:text-gray-600')
	})

	// Add active state to clicked items (both desktop and mobile versions)
	const desktopItem = document.getElementById(activeId)
	const mobileItem = document.getElementById(activeId + '-mobile')

	if (desktopItem) {
		desktopItem.classList.add('active-nav')
		const svg = desktopItem.querySelector('svg')
		const span = desktopItem.querySelector('span')
		if (svg) {
			svg.classList.remove('text-gray-400', 'text-gray-500')
			svg.classList.add('text-indigo-600')
		}
		if (span) {
			span.classList.remove('text-gray-400', 'text-gray-600')
			span.classList.add('text-indigo-600')
		}
	}

	if (mobileItem) {
		mobileItem.classList.add('active-nav-mobile')
		const svg = mobileItem.querySelector('svg')
		const span = mobileItem.querySelector('span')
		if (svg) {
			svg.classList.remove('text-gray-400')
			svg.classList.add('text-indigo-600')
		}
		if (span) {
			span.classList.remove('text-gray-400')
			span.classList.add('text-indigo-600')
		}
	}
}

navItems.forEach(item => {
	item.addEventListener('click', async () => {
		const viewId = item.id.replace('-mobile', '')
		main(viewId)
	})
})

async function loadView(viewId) {
	const html = await window.dom.renderView(viewId)
	content.innerHTML = html
}

async function chargeData(viewId, apiFunction) {
	const list = document.getElementById(viewId + '-list')
	if (!list) return
	const data = await apiFunction()
	let card
	data.forEach(item => {
		if (viewId === 'users') {
			card = document.createElement('user-card')
		}
		if (viewId === 'publications') {
			card = document.createElement('pub-card')
		}
		if (viewId === 'movements') {
			card = document.createElement('movement-card')
		}
		card.data = item
		list.appendChild(card)
	})
}


async function main(viewId) {
	updateActiveStates(viewId)
	await loadView(viewId)
	if (viewId === "users") {
		await chargeData(viewId, window.api.getUsers)
	}

	if (viewId === "publications") {
		await chargeData(viewId, window.api.getPublications)
	}

	if (viewId === "movements") {
		await chargeData(viewId, window.api.getMovements)
	}
}

main("publications")
