import { Render } from "../renderer.js"
import { publicationsView, publicationView, addPublicationView } from "./publications/publications.view.js"
import { usersView, addUsersView, movementsUserView } from "./users/users.view.js"
import { inventoryView, addInventoryView, InventoryHistoryView } from "./inventory/inventory.view.js"
import { movementsView, addMovementView } from "./movements/movements.view.js"

const routes = {
    'publications': publicationsView,
    'get-publication': publicationView,
    'add-publication': addPublicationView,

    'users': usersView,
    'add-user': addUsersView,

    'inventory': inventoryView,
    'add-inventory': addInventoryView,
    'inventory-history': InventoryHistoryView,

    'movements': movementsView,
    'add-movement': addMovementView,
    'movements-user': movementsUserView,
}

export default async function navigateTo(route, params = {}) {
    const View = routes[route]
    if (!View) {
        throw new Error(`Route ${route} not found`)
    }
    Render(await View(params))
}
