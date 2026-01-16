export default async function publicationsView(params) {
	const container = document.createElement('div');
	container.innerHTML = `
    <section id="publications">
			<div class="panel flex flex-row justify-between items-center">
				<h1 class="title text-2xl font-bold">Publicaciones</h1>
				<div>
					<button
						class="filter-button rounded-lg p-2 text-md hover:cursor-pointer pr-2 hover:bg-neutral-200 hover:text-neutral-900">Check</button>
					<button id="add-publication-button"
						class="add-button rounded-lg p-2 text-2xl hover:cursor-pointer hover:bg-neutral-200 hover:text-neutral-900">+</button>
				</div>
			</div>
		</section>
    `
	const data = await window.api.getPublications();
	data.forEach(JSONResponse => {
		let publication = document.createElement('pub-card');
		publication.data = JSONResponse;
		container.appendChild(publication);
	});

	return container
}

export async function publicationView(params) {
	const container = document.createElement('div');
	const data = await window.api.getPublication(params.id);
	const publication = document.createElement('inventory-card');
	publication.data = data;
	container.appendChild(publication);
	return container
}

export async function addPublicationView(params) {
	const container = document.createElement('div');
	container.innerHTML = `
    <section id="add-publication">
			<div class="panel flex flex-row justify-between items-center">
				<h1 class="title text-2xl font-bold">Agregar Publicación</h1>
			</div>
			<div class="flex flex-col">
				<form id="add-publication-form" class="flex flex-col gap-2 pt-2">
					<input id="name" name="name" class="p-2 rounded-lg border border-neutral-200" type="text" placeholder="Nombre" required>
					<input id="year" name="year" class="p-2 rounded-lg border border-neutral-200" type="number" placeholder="Año" required min="1900" max="2100">
					<input id="month" name="month" class="p-2 rounded-lg border border-neutral-200" type="text" placeholder="Mes" required>
					<input id="type" name="type" class="p-2 rounded-lg border border-neutral-200" type="text" placeholder="Tipo" required>
					<input id="code" name="code" class="p-2 rounded-lg border border-neutral-200" type="text" placeholder="Código" required>
					<button type="submit" class="add-button rounded-lg p-2 text-2xl hover:cursor-pointer hover:bg-neutral-200 hover:text-neutral-900">+</button>
				</form>
			</div>
		</section>
    `

	const form = container.querySelector('#add-publication-form');
	form.addEventListener('submit', async (e) => {
		e.preventDefault();
		const formData = new FormData(form);
		const data = {
			name: formData.get('name'),
			year: formData.get('year'),
			month: formData.get('month'),
			type: formData.get('type'),
			code: formData.get('code')
		};
		try {
			await window.api.createPublication(data);
			alert('Publicación agregada correctamente');
		} catch (error) {
			console.error(error);
		}
	});

	return container
}