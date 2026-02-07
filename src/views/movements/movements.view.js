import navigateTo from "../router.js";
import { Header } from "../../components/headers.js";
import { MovementsForm } from "../../components/forms.js";

export async function movementsView() {
    const container = document.createElement('div')
    const movements = await window.api.getMovements()
    const header = Header({
        title: 'Movimientos',
        description: 'Aquí puedes ver todos los movimientos',
        button: {
            id: 'add-movement-button',
            text: 'Agregar',
            event: 'click',
            color: 'bg-blue-500',
            hover: 'blue-600',
            action: async () => await navigateTo('add-movement')
        }
    })

    container.appendChild(header)

    movements.reverse().forEach(movement => {
        const movementElement = document.createElement('movement-card')
        movementElement.data = movement
        container.appendChild(movementElement)
    });

    return container
}


export async function addMovementView() {
    const container = document.createElement('div')

    const users = await window.api.getUsers()
    const publications = await window.api.getPublications()

    container.innerHTML = MovementsForm({ users, publications })
    const form = container.querySelector('#add-movement-form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = {
            user_id: formData.get('user_id'),
            publication_id: formData.get('publication_id'),
            quantity: formData.get('quantity'),
            movement_type: formData.get('movement_type')
        };
        try {
            await window.api.createMovement(data);
            alert('Movimiento agregado correctamente');
        } catch (error) {
            console.error(error);
        }
    });

    return container
}

