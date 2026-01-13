const navItems = document.querySelectorAll('.nav-item')
const content = document.getElementById('content')

// Function to update active states
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
        // Extract the view ID (remove '-mobile' suffix if present)
        const viewId = item.id.replace('-mobile', '')

        // Update active states
        updateActiveStates(viewId)

        // Load the view content
        const html = await window.dom.renderView(viewId)
        content.innerHTML = html
        main(viewId)
    })
})


async function main(viewId) {

    if (viewId === 'publications') {
        const publicationsList = document.getElementById('publications-list')
        if (!publicationsList) return
        const publications = await window.api.getPublications()
        console.log(publications)
        publications.forEach(publication => {
            const card = document.createElement('pub-card')
            card.data = publication
            publicationsList.appendChild(card)
        })
    }

    if (viewId === 'users') {
        const usersList = document.getElementById('users-list')
        if (!usersList) return
        const users = await window.api.getUsers()
        console.log(users)
        users.forEach(user => {
            const card = document.createElement('user-card')
            card.data = user
            usersList.appendChild(card)
        })
    }
}

main()
