const navItems = document.querySelectorAll('.nav-item')

navItems.forEach(item => {
    item.addEventListener('click', () => {
        const view = item.textContent.toLowerCase()
        renderView(view)
    })
})

function renderView(view) {
    window.electronapi.renderView(view)
    console.log('render ' + view)
}

async function mainThread() {
    const publicationList = document.getElementById('publications')
    const publications = await window.api.getPublications()

    publications.forEach(publication => {
        const card = document.createElement('user-card')
        card.data = publication
        publicationList.appendChild(card)
    })

}

mainThread()
