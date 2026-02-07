import navigateTo from "./views/router.js"

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

export function Render(html) {
	content.innerHTML = ''
	content.appendChild(html)
}

async function main(viewId) {
	updateActiveStates(viewId)

	if (viewId === "publications") {
		await navigateTo('publications')
	}

	if (viewId === "users") {
		await navigateTo('users')
	}

	if (viewId === "movements") {
		await navigateTo('movements')
	}

	if (viewId === "inventory") {
		await navigateTo('inventory')
	}
}

main("publications")
