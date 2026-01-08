
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
