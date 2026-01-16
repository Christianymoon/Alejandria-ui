import { Render } from "../renderer.js"
import publicationsView from "./publications/publications.view.js"
import { publicationView, addPublicationView } from "./publications/publications.view.js"
import usersView from "./users/users.view.js"
import { inventoryView, addInventoryView } from "./inventory/inventory.view.js"
import movementsView from "./movements/movements.view.js"

const routes = {
    'publications': publicationsView,
    'get-publication': publicationView,
    'add-publication': addPublicationView,
    'users': usersView,
    'inventory': inventoryView,
    'add-inventory': addInventoryView,
    'movements': movementsView,
}

export default async function navigateTo(route, params = {}) {
    const View = routes[route]
    if (!View) {
        throw new Error(`Route ${route} not found`)
    }
    Render(await View(params))
}
