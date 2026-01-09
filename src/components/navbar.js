class Navbar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <nav class="navbar flex flex-row justify-between bg-neutral-100 p-4 rounded-lg mb-4">
                <a href="users.html">Usuarios</a>
                <a href="publications.html">Publicaciones</a>
                <a href="#">Movimientos</a>
            </nav>
        `
    }

}

customElements.define('navbar-component', Navbar);
