import navigateTo from "../router.js";
import { Header } from "../../components/headers.js";
import { PublicationForm } from "../../components/forms.js";

export async function publicationsView(params) {
	const container = document.createElement('div');
	const publications = await window.api.getPublications();
	const header = Header({
		title: 'Publicaciones',
		description: 'Aquí puedes ver todas las publicaciones',
		button: {
			id: 'add-publication-button',
			text: 'Agregar',
			event: 'click',
			color: 'bg-blue-500',
			hover: 'blue-600',
			action: async () => await navigateTo('add-publication', { id: 'new' })
		}
	})

	container.appendChild(header)


	publications.forEach(publication => {
		let publicationElement = document.createElement('pub-card');
		publicationElement.data = publication;
		container.appendChild(publicationElement);
		publicationElement.addEventListener('click', async () => {
			await navigateTo('get-publication', { id: publication.id })
		});
	});


	return container
}

export async function publicationView(params) {
	const container = document.createElement('div');
	const data = await window.api.getPublication(params.id);
	const header = Header({
		title: `Publicación ${data.name}`,
		description: 'Aquí puedes ver los detalles de la publicación',
		button: {
			id: 'delete-publication-button',
			text: 'Eliminar',
			event: 'click',
			color: 'bg-red-500',
			hover: 'red-600',
			action: async () => { await window.api.deletePublication(params.id); navigateTo('publications'); }
		}
	})
	container.appendChild(header)

	const publication = document.createElement('inventory-card');
	publication.data = data;
	container.appendChild(publication);

	return container
}

export async function addPublicationView(params) {
	const container = document.createElement('div');
	container.innerHTML = PublicationForm()
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