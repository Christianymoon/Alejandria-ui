export function Header(params = {}) {
    const title = params.title || 'Titulo'
    const description = params.description || ''
    const button = params.button || null
    const searcher = params.searcher || false

    const container = document.createElement('div')
    container.className = 'flex flex-col pb-2 pt-2 gap-2'
    container.innerHTML = `
        <div class="flex flex-col pb-2 pt-2 gap-2">
            <h1 class="text-2xl font-semibold text-gray-900">${title}</h1>
            <p class="text-sm text-gray-500 mt-1">${description}</p>
        </div>
        <div class="flex flex-row gap-2">
            ${button ? `<button id="${button.id}" class="${button.color} hover:bg-${button.hover}-600 text-white px-4 py-2 rounded-lg hover:cursor-pointer">${button.text}</button>` : ''}
            ${searcher ? `<input id="${searcher.id}" class="${searcher.color} hover:bg-${searcher.hover}-600 text-black px-4 py-2 rounded-lg hover:cursor-pointer" type="text" placeholder="${searcher.placeholder}">` : ''}
        </div>
    `

    if (button) {
        const buttonElement = container.querySelector(`#${button.id}`)
        buttonElement.addEventListener(button.event, button.action)
    }

    if (searcher) {
        const searcherElement = container.querySelector(`#${searcher.id}`)
        searcherElement.addEventListener(searcher.event, searcher.action)
    }

    return container
}