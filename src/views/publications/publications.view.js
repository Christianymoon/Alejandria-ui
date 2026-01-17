export async function publicationsView(params) {
	const container = document.createElement('div');
	const superiorPanel = document.createElement('div')
	superiorPanel.className = 'flex flex-col bg-neutral-50 justify-between pb-2 pt-2'
	superiorPanel.innerHTML = `
		<div class="flex flex-row pb-2 pt-2 gap-2">
			<h1 class="text-2xl font-semibold text-gray-900">Publicaciones</h1>
		</div>
		<div class="flex flex-row gap-2">
			<button id="add-publication-button" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg hover:cursor-pointer">Agregar</button>
		</div>
	`
	container.appendChild(superiorPanel)
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
		<div class="flex flex-col gap-6 max-w-2xl mx-auto">
			<!-- Header Section -->
			<div class="flex items-center justify-between pb-4 border-b border-gray-200">
				<div>
					<h1 class="text-3xl font-bold text-gray-900">Agregar Publicación</h1>
					<p class="text-sm text-gray-500 mt-1">Complete los campos para agregar una nueva publicación al sistema</p>
				</div>
			</div>

			<!-- Form Section -->
			<form id="add-publication-form" class="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
				<div class="space-y-6">
					<!-- Name Field -->
					<div class="flex flex-col gap-2">
						<label for="name" class="text-sm font-semibold text-gray-700 uppercase tracking-wide">
							Nombre
						</label>
						<input 
							type="text" 
							id="name" 
							name="name" 
							required
							placeholder="Ingrese el nombre de la publicación"
							class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 
								   focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white
								   transition-all duration-200 outline-none
								   hover:border-gray-300 placeholder-gray-400"
						>
					</div>

					<!-- Year Field -->
					<div class="flex flex-col gap-2">
						<label for="year" class="text-sm font-semibold text-gray-700 uppercase tracking-wide">
							Año
						</label>
						<input 
							type="number" 
							id="year" 
							name="year" 
							required
							min="1900"
							max="2100"
							placeholder="Ingrese el año"
							class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 
								   focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white
								   transition-all duration-200 outline-none
								   hover:border-gray-300 placeholder-gray-400"
						>
					</div>

					<!-- Month Field -->
					<div class="flex flex-col gap-2">
						<label for="month" class="text-sm font-semibold text-gray-700 uppercase tracking-wide">
							Mes
						</label>
						<input 
							type="text" 
							id="month" 
							name="month" 
							required
							placeholder="Ingrese el mes"
							class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 
								   focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white
								   transition-all duration-200 outline-none
								   hover:border-gray-300 placeholder-gray-400"
						>
					</div>

					<!-- Type Field -->
					<div class="flex flex-col gap-2">
						<label for="type" class="text-sm font-semibold text-gray-700 uppercase tracking-wide">
							Tipo
						</label>
						<input 
							type="text" 
							id="type" 
							name="type" 
							required
							placeholder="Ingrese el tipo de publicación"
							class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 
								   focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white
								   transition-all duration-200 outline-none
								   hover:border-gray-300 placeholder-gray-400"
						>
					</div>

					<!-- Code Field -->
					<div class="flex flex-col gap-2">
						<label for="code" class="text-sm font-semibold text-gray-700 uppercase tracking-wide">
							Código
						</label>
						<input 
							type="text" 
							id="code" 
							name="code" 
							required
							placeholder="Ingrese el código de la publicación"
							class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 
								   focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white
								   transition-all duration-200 outline-none
								   hover:border-gray-300 placeholder-gray-400"
						>
					</div>

					<!-- Submit Button -->
					<div class="flex gap-3 pt-4">
						<button 
							type="submit"
							class="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700
								   text-white font-semibold px-6 py-3 rounded-xl
								   shadow-lg hover:shadow-xl hover:scale-[1.02] hover:cursor-pointer
								   transition-all duration-200 ease-out
								   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
						>
							Agregar Publicación
						</button>
						<button 
							type="button"
							id="cancel-button"
							class="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl
								   transition-all duration-200 ease-out
								   focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2
								   hover:cursor-pointer"
						>
							Cancelar
						</button>
					</div>
				</div>
			</form>
		</div>
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