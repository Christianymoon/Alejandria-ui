export default async function movementsView() {
	const container = document.createElement('div')
	container.innerHTML = `
        <section id="movements">
            <div class="panel flex flex-row justify-between items-center">
                <h1 class="title text-2xl font-bold">Movimientos</h1>
                <div>
                    <button
                        class="filter-button rounded-lg p-2 text-md hover:cursor-pointer pr-2 hover:bg-neutral-200 hover:text-neutral-900">Check</button>
                    <button
                        class="add-button rounded-lg p-2 text-2xl hover:cursor-pointer hover:bg-neutral-200 hover:text-neutral-900">+</button>
                </div>
            </div>
        </section>
    `
	const movements = await window.api.getMovements()
	movements.forEach(movement => {
		const movementElement = document.createElement('movement-card')
		movementElement.data = movement
		container.appendChild(movementElement)
	});
	return container
}