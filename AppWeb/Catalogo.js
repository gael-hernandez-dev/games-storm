// Catálogo de demostración con categorías, precios e ilustraciones.
const products = [
    { id: "elden-ring", name: "Elden Ring: Shadow of the Erdtree", category: "Juegos", price: 1199, emoji: "🗡️", art: "art-violet", badge: "Más vendido", rating: "4.9", reviews: 328 },
    { id: "zelda", name: "The Legend of Zelda: Tears of the Kingdom", category: "Juegos", price: 1399, emoji: "🛡️", art: "art-green", badge: "Popular", rating: "4.9", reviews: 214 },
    { id: "cyberpunk", name: "Cyberpunk 2077: Ultimate Edition", category: "Juegos", price: 899, emoji: "🌆", art: "art-orange", badge: "Oferta", rating: "4.8", reviews: 176 },
    { id: "spider-man", name: "Marvel's Spider-Man 2", category: "Juegos", price: 1299, emoji: "🕸️", art: "art-blue", badge: "", rating: "4.8", reviews: 192 },
    { id: "switch-oled", name: "Consola Nintendo Switch OLED", category: "Consolas", price: 6499, emoji: "🎮", art: "art-pink", badge: "Popular", rating: "4.9", reviews: 405 },
    { id: "ps5-slim", name: "Consola PlayStation 5 Slim", category: "Consolas", price: 9999, emoji: "🕹️", art: "art-blue", badge: "Nuevo", rating: "4.8", reviews: 271 },
    { id: "steam-deck", name: "Consola portátil Steam Deck OLED", category: "Consolas", price: 11999, emoji: "🎮", art: "art-violet", badge: "", rating: "4.7", reviews: 153 },
    { id: "xbox-pad", name: "Control inalámbrico Xbox", category: "Accesorios", price: 1399, emoji: "🎮", art: "art-green", badge: "", rating: "4.8", reviews: 231 },
    { id: "headset", name: "Audífonos gamer HyperX Cloud", category: "Accesorios", price: 1899, emoji: "🎧", art: "art-pink", badge: "Oferta", rating: "4.7", reviews: 187 },
    { id: "keyboard", name: "Teclado mecánico RGB compacto", category: "Accesorios", price: 1599, emoji: "⌨️", art: "art-violet", badge: "", rating: "4.6", reviews: 98 },
    { id: "mouse", name: "Mouse gamer Logitech G502", category: "Accesorios", price: 1099, emoji: "🖱️", art: "art-orange", badge: "Más vendido", rating: "4.8", reviews: 342 },
    { id: "monitor", name: "Monitor gamer 27 pulgadas 165 Hz", category: "Computadoras", price: 5499, emoji: "🖥️", art: "art-blue", badge: "Nuevo", rating: "4.7", reviews: 116 },
    { id: "gaming-pc", name: "PC gamer Ryzen 7 con gráficos RTX", category: "Computadoras", price: 24999, emoji: "💻", art: "art-green", badge: "Premium", rating: "4.9", reviews: 84 },
    { id: "laptop", name: "Laptop gamer 15 pulgadas", category: "Computadoras", price: 18999, emoji: "💻", art: "art-violet", badge: "", rating: "4.6", reviews: 69 },
    { id: "webcam", name: "Webcam Full HD para streaming", category: "Accesorios", price: 899, emoji: "📷", art: "art-orange", badge: "", rating: "4.5", reviews: 57 },
    { id: "racing-wheel", name: "Volante de carreras con pedales", category: "Accesorios", price: 4299, emoji: "🏎️", art: "art-pink", badge: "Nuevo", rating: "4.7", reviews: 73 }
];

// Estado de búsqueda, filtros, orden y artículos agregados.
const state = {
    category: "Todos",
    query: "",
    sort: "featured",
    cart: []
};

// Referencias a los elementos que actualiza la aplicación.
const productGrid = document.getElementById("product-grid");
const searchInput = document.getElementById("search-input");
const sortSelect = document.getElementById("sort-select");
const resultCount = document.getElementById("result-count");
const emptyState = document.getElementById("empty-state");
const cartTrigger = document.getElementById("cart-trigger");
const cartDrawer = document.getElementById("cart-drawer");
const drawerBackdrop = document.getElementById("drawer-backdrop");
const cartItems = document.getElementById("cart-items");
const cartEmpty = document.getElementById("cart-empty");
const cartCount = document.getElementById("cart-count");
const drawerItemCount = document.getElementById("drawer-item-count");
const cartTotal = document.getElementById("cart-total");
const checkoutButton = document.getElementById("checkout-button");

const money = new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN"
});

// Crea una tarjeta de producto con su botón para agregar al carrito.
function createProductCard(product) {
    const badge = product.badge
        ? `<span class="product-badge">${product.badge}</span>`
        : "";

    return `
        <article class="product-card">
            <div class="product-art ${product.art}">
                ${badge}
                <span class="product-emoji" aria-hidden="true">${product.emoji}</span>
            </div>
            <div class="product-details">
                <p class="product-category">${product.category}</p>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-rating" aria-label="Calificación ${product.rating} de 5">
                    ★★★★★ <span>${product.rating} (${product.reviews})</span>
                </p>
                <div class="product-buy-row">
                    <span class="product-price">${money.format(product.price)}</span>
                    <button class="add-button" type="button" data-add="${product.id}"
                            aria-label="Agregar ${product.name} al carrito">+</button>
                </div>
            </div>
        </article>`;
}

// Filtra y ordena el catálogo antes de mostrarlo en la cuadrícula.
function renderProducts() {
    const normalizedQuery = state.query.trim().toLocaleLowerCase("es-MX");
    let visibleProducts = products.filter((product) => {
        const matchesCategory = state.category === "Todos" || product.category === state.category;
        const matchesQuery = `${product.name} ${product.category}`
            .toLocaleLowerCase("es-MX")
            .includes(normalizedQuery);

        return matchesCategory && matchesQuery;
    });

    if (state.sort === "price-low") {
        visibleProducts = [...visibleProducts].sort((a, b) => a.price - b.price);
    } else if (state.sort === "price-high") {
        visibleProducts = [...visibleProducts].sort((a, b) => b.price - a.price);
    } else if (state.sort === "name") {
        visibleProducts = [...visibleProducts].sort((a, b) => a.name.localeCompare(b.name, "es"));
    }

    productGrid.innerHTML = visibleProducts.map(createProductCard).join("");
    resultCount.textContent = `${visibleProducts.length} productos`;
    emptyState.hidden = visibleProducts.length !== 0;
}

// Sincroniza el filtro visual con la categoría seleccionada.
function selectCategory(category) {
    state.category = category;

    document.querySelectorAll(".category-button").forEach((button) => {
        const isSelected = button.dataset.category === category;
        button.classList.toggle("selected", isSelected);
        button.setAttribute("aria-pressed", String(isSelected));
    });

    renderProducts();
}

// Agrega una unidad del producto o incrementa su cantidad actual.
function addToCart(productId) {
    const existingItem = state.cart.find((item) => item.productId === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        state.cart.push({ productId, quantity: 1 });
    }

    renderCart();
}

// Cambia la cantidad y elimina el producto si llega a cero.
function changeQuantity(productId, amount) {
    const item = state.cart.find((cartItem) => cartItem.productId === productId);

    if (!item) {
        return;
    }

    item.quantity += amount;
    state.cart = state.cart.filter((cartItem) => cartItem.quantity > 0);
    renderCart();
}

// Dibuja el contenido del carrito y calcula el total de la compra simulada.
function renderCart() {
    const itemCount = state.cart.reduce((total, item) => total + item.quantity, 0);
    const total = state.cart.reduce((sum, item) => {
        const product = products.find((entry) => entry.id === item.productId);
        return sum + product.price * item.quantity;
    }, 0);

    cartCount.textContent = itemCount;
    drawerItemCount.textContent = `(${itemCount})`;
    cartTotal.textContent = money.format(total);
    cartEmpty.hidden = itemCount !== 0;
    cartItems.hidden = itemCount === 0;
    checkoutButton.disabled = itemCount === 0;

    cartItems.innerHTML = state.cart.map((item) => {
        const product = products.find((entry) => entry.id === item.productId);

        return `
            <article class="cart-item">
                <div class="cart-item-art ${product.art}" aria-hidden="true">${product.emoji}</div>
                <div class="cart-item-info">
                    <h3>${product.name}</h3>
                    <p>${money.format(product.price)}</p>
                    <div class="quantity-controls" aria-label="Cantidad de ${product.name}">
                        <button type="button" data-quantity="${product.id}" data-change="-1"
                                aria-label="Quitar una unidad de ${product.name}">−</button>
                        <span>${item.quantity}</span>
                        <button type="button" data-quantity="${product.id}" data-change="1"
                                aria-label="Agregar una unidad de ${product.name}">+</button>
                    </div>
                </div>
                <button class="remove-item" type="button" data-remove="${product.id}"
                        aria-label="Eliminar ${product.name} del carrito">×</button>
            </article>`;
    }).join("");
}

// Abre el panel, activa el fondo y mueve el foco al botón para cerrarlo.
function openCart() {
    cartDrawer.classList.add("is-open");
    cartDrawer.setAttribute("aria-hidden", "false");
    cartTrigger.setAttribute("aria-expanded", "true");
    drawerBackdrop.hidden = false;
    document.body.classList.add("cart-open");
    requestAnimationFrame(() => drawerBackdrop.classList.add("visible"));
    document.getElementById("close-cart").focus();
}

// Cierra el panel y devuelve el foco al botón que lo abrió.
function closeCart() {
    cartDrawer.classList.remove("is-open");
    cartDrawer.setAttribute("aria-hidden", "true");
    cartTrigger.setAttribute("aria-expanded", "false");
    drawerBackdrop.classList.remove("visible");
    document.body.classList.remove("cart-open");
    window.setTimeout(() => {
        if (!cartDrawer.classList.contains("is-open")) {
            drawerBackdrop.hidden = true;
        }
    }, 220);
    cartTrigger.focus();
}

// Registra las acciones de búsqueda, filtros, carrito y compra simulada.
function initializeStore() {
    searchInput.addEventListener("input", (event) => {
        state.query = event.currentTarget.value;
        renderProducts();
    });

    sortSelect.addEventListener("change", (event) => {
        state.sort = event.currentTarget.value;
        renderProducts();
    });

    document.querySelectorAll(".category-button").forEach((button) => {
        button.addEventListener("click", () => selectCategory(button.dataset.category));
    });

    document.querySelectorAll("[data-nav-category]").forEach((link) => {
        link.addEventListener("click", () => {
            selectCategory(link.dataset.navCategory);
        });
    });

    productGrid.addEventListener("click", (event) => {
        const addButton = event.target.closest("[data-add]");
        if (addButton) {
            addToCart(addButton.dataset.add);
        }
    });

    cartItems.addEventListener("click", (event) => {
        const removeButton = event.target.closest("[data-remove]");
        const quantityButton = event.target.closest("[data-quantity]");

        if (removeButton) {
            state.cart = state.cart.filter((item) => item.productId !== removeButton.dataset.remove);
            renderCart();
        } else if (quantityButton) {
            changeQuantity(quantityButton.dataset.quantity, Number(quantityButton.dataset.change));
        }
    });

    cartTrigger.addEventListener("click", openCart);
    document.getElementById("close-cart").addEventListener("click", closeCart);
    drawerBackdrop.addEventListener("click", closeCart);

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && cartDrawer.classList.contains("is-open")) {
            closeCart();
        }

        if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
            event.preventDefault();
            searchInput.focus();
        }
    });

    checkoutButton.addEventListener("click", () => {
        if (state.cart.length === 0) {
            return;
        }

        window.alert("¡Gracias! Tu compra de demostración se completó.");
        state.cart = [];
        renderCart();
        closeCart();
    });

    renderProducts();
    renderCart();
}

initializeStore();
