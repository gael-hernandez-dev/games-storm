// Productos de demostración disponibles en el catálogo.
const productos = [
    { identificador: "elden-ring", nombre: "Elden Ring: Shadow of the Erdtree", categoria: "Videojuegos", precio: 1199, icono: "🗡️", color: "fondo-lila", etiqueta: "Más vendido", calificacion: "4.9", resenas: 328 },
    { identificador: "zelda", nombre: "The Legend of Zelda: Tears of the Kingdom", categoria: "Videojuegos", precio: 1399, icono: "🛡️", color: "fondo-claro", etiqueta: "Popular", calificacion: "4.9", resenas: 214 },
    { identificador: "cyberpunk", nombre: "Cyberpunk 2077: Ultimate Edition", categoria: "Videojuegos", precio: 899, icono: "🌆", color: "fondo-medio", etiqueta: "Oferta", calificacion: "4.8", resenas: 176 },
    { identificador: "spider-man", nombre: "Marvel's Spider-Man 2", categoria: "Videojuegos", precio: 1299, icono: "🕸️", color: "fondo-oscuro", etiqueta: "", calificacion: "4.8", resenas: 192 },
    { identificador: "switch-oled", nombre: "Consola Nintendo Switch OLED", categoria: "Consolas", precio: 6499, icono: "🎮", color: "fondo-rosa", etiqueta: "Popular", calificacion: "4.9", resenas: 405 },
    { identificador: "ps5-slim", nombre: "Consola PlayStation 5 Slim", categoria: "Consolas", precio: 9999, icono: "🕹️", color: "fondo-oscuro", etiqueta: "Nuevo", calificacion: "4.8", resenas: 271 },
    { identificador: "steam-deck", nombre: "Consola portátil Steam Deck OLED", categoria: "Consolas", precio: 11999, icono: "🎮", color: "fondo-lila", etiqueta: "", calificacion: "4.7", resenas: 153 },
    { identificador: "control-xbox", nombre: "Control inalámbrico Xbox", categoria: "Accesorios", precio: 1399, icono: "🎮", color: "fondo-claro", etiqueta: "", calificacion: "4.8", resenas: 231 },
    { identificador: "audifonos", nombre: "Audífonos gamer HyperX Cloud", categoria: "Accesorios", precio: 1899, icono: "🎧", color: "fondo-rosa", etiqueta: "Oferta", calificacion: "4.7", resenas: 187 },
    { identificador: "teclado", nombre: "Teclado mecánico RGB compacto", categoria: "Accesorios", precio: 1599, icono: "⌨️", color: "fondo-lila", etiqueta: "", calificacion: "4.6", resenas: 98 },
    { identificador: "raton", nombre: "Ratón gamer Logitech G502", categoria: "Accesorios", precio: 1099, icono: "🖱️", color: "fondo-medio", etiqueta: "Más vendido", calificacion: "4.8", resenas: 342 },
    { identificador: "monitor", nombre: "Monitor gamer 27 pulgadas 165 Hz", categoria: "Computadoras", precio: 5499, icono: "🖥️", color: "fondo-oscuro", etiqueta: "Nuevo", calificacion: "4.7", resenas: 116 },
    { identificador: "computadora-gamer", nombre: "PC gamer Ryzen 7 con gráficos RTX", categoria: "Computadoras", precio: 24999, icono: "💻", color: "fondo-claro", etiqueta: "Premium", calificacion: "4.9", resenas: 84 },
    { identificador: "portatil-gamer", nombre: "Laptop gamer 15 pulgadas", categoria: "Computadoras", precio: 18999, icono: "💻", color: "fondo-lila", etiqueta: "", calificacion: "4.6", resenas: 69 },
    { identificador: "camara-web", nombre: "Cámara web Full HD para transmisiones", categoria: "Accesorios", precio: 899, icono: "📷", color: "fondo-medio", etiqueta: "", calificacion: "4.5", resenas: 57 },
    { identificador: "volante-carreras", nombre: "Volante de carreras con pedales", categoria: "Accesorios", precio: 4299, icono: "🏎️", color: "fondo-rosa", etiqueta: "Nuevo", calificacion: "4.7", resenas: 73 }
];

// Estado actual de los filtros, el orden, el carrito y el panel abierto.
const estado = {
    categoria: "Todos",
    busqueda: "",
    orden: "destacados",
    carrito: [],
    panelAbierto: null
};

// Referencias a los elementos que se actualizan desde JavaScript.
const cuadriculaProductos = document.getElementById("cuadricula-productos");
const campoBusqueda = document.getElementById("campo-busqueda");
const selectorOrden = document.getElementById("selector-orden");
const cantidadResultados = document.getElementById("cantidad-resultados");
const mensajeVacio = document.getElementById("mensaje-vacio");
const botonAbrirFiltros = document.getElementById("abrir-filtros");
const panelFiltros = document.getElementById("panel-filtros");
const botonAbrirCarrito = document.getElementById("abrir-carrito");
const panelCarrito = document.getElementById("panel-carrito");
const fondoPanel = document.getElementById("fondo-panel");
const articulosCarrito = document.getElementById("articulos-carrito");
const avisoCarritoVacio = document.getElementById("carrito-vacio");
const contadorCarrito = document.getElementById("contador-carrito");
const cantidadCarrito = document.getElementById("cantidad-carrito");
const totalCarrito = document.getElementById("total-carrito");
const botonPago = document.getElementById("boton-pago");
const modalPago = document.getElementById("modal-pago");
const formularioPago = document.getElementById("formulario-pago");
const paisCliente = document.getElementById("pais-cliente");
const numeroTarjeta = document.getElementById("numero-tarjeta");

// Presenta todos los importes como moneda mexicana.
const formateadorMoneda = new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN"
});

// Construye la tarjeta que representa un producto
function crearTarjetaProducto(producto) {
    const etiqueta = producto.etiqueta ? `<span class="etiqueta-producto">${producto.etiqueta}</span>` : "";

    // La plantilla genera el HTML de una tarjeta
    return `
        <article class="tarjeta-producto">
            <div class="imagen-producto ${producto.color}">
                ${etiqueta}
                <span class="icono-producto" aria-hidden="true">${producto.icono}</span>
            </div>
            <div class="detalles-producto">
                <p class="categoria-producto">${producto.categoria}</p>
                <h2 class="nombre-producto">${producto.nombre}</h2>
                <p class="calificacion-producto" aria-label="Calificación ${producto.calificacion} de 5">
                    ★★★★★ <span>${producto.calificacion} (${producto.resenas})</span>
                </p>
                <div class="compra-producto">
                    <span class="precio-producto">${formateadorMoneda.format(producto.precio)}</span>
                    <button class="boton-agregar" type="button" data-agregar="${producto.identificador}"
                            aria-label="Agregar ${producto.nombre} al carrito">+</button>
                </div>
            </div>
        </article>`;
}

// Aplica búsqueda, categoría y orden
function dibujarCatalogo() {
    // Normaliza el texto para que la búsqueda
    const busquedaSimple = estado.busqueda.trim().toLocaleLowerCase("es-MX");
    let productosVisibles = productos.filter((producto) => {
        // Se combinan los criterios: el producto debe cumplir categoría y búsqueda
        const coincideCategoria = estado.categoria === "Todos" || producto.categoria === estado.categoria;
        const coincideBusqueda = `${producto.nombre} ${producto.categoria}`
            .toLocaleLowerCase("es-MX")
            .includes(busquedaSimple);

        return coincideCategoria && coincideBusqueda;
    });

    if (estado.orden === "precio-menor")
    {
        productosVisibles = [...productosVisibles].sort((a, b) => a.precio - b.precio);
    } 
    else if (estado.orden === "precio-mayor") 
    {
        productosVisibles = [...productosVisibles].sort((a, b) => b.precio - a.precio);
    } 
    else if (estado.orden === "nombre") 
    {
        productosVisibles = [...productosVisibles].sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));
    }

    // map crea una tarjeta por producto y join las une
    cuadriculaProductos.innerHTML = productosVisibles.map(crearTarjetaProducto).join("");
    cantidadResultados.textContent = `${productosVisibles.length} productos`;
    // Ningún producto coincide.
    mensajeVacio.hidden = productosVisibles.length !== 0;
}

// Actualiza la categoría seleccionada
function seleccionarCategoria(categoria) {
    estado.categoria = categoria;

    document.querySelectorAll(".boton-categoria").forEach((boton) => {
        const seleccionado = boton.dataset.categoria === categoria;
        boton.classList.toggle("seleccionado", seleccionado);
        boton.setAttribute("aria-pressed", String(seleccionado));
    });

    dibujarCatalogo();
}

// Agrega el artículo al carrito
function agregarAlCarrito(identificadorProducto) {
    const articuloExistente = estado.carrito.find(
        (articulo) => articulo.identificador === identificadorProducto
    );

    if (articuloExistente) 
    {
        articuloExistente.cantidad += 1;
    } 
    else 
    {
        estado.carrito.push({ identificador: identificadorProducto, cantidad: 1 });
    }

    dibujarCarrito();
}

// Cambia la cantidad de un artículo y lo quita cuando llega a cero
function cambiarCantidad(identificadorProducto, cambio) {
    const articulo = estado.carrito.find(
        (elemento) => elemento.identificador === identificadorProducto
    );

    if (!articulo)
    {
        return;
    }

    articulo.cantidad += cambio;
    estado.carrito = estado.carrito.filter((elemento) => elemento.cantidad > 0);
    dibujarCarrito();
}

// Dibuja los artículos, el contador y el total actualizado del carrito
function dibujarCarrito() {
    const totalArticulos = estado.carrito.reduce(
        (total, articulo) => total + articulo.cantidad, 0);

    const importeTotal = estado.carrito.reduce((total, articulo) => {
        const producto = productos.find(
            (elemento) => elemento.identificador === articulo.identificador
        );
        return total + producto.precio * articulo.cantidad;
    }, 0);

    // Actualiza contadores, importe y controles según si hay productos
    contadorCarrito.textContent = totalArticulos;
    cantidadCarrito.textContent = `(${totalArticulos})`;
    totalCarrito.textContent = formateadorMoneda.format(importeTotal);
    avisoCarritoVacio.hidden = totalArticulos !== 0;
    articulosCarrito.hidden = totalArticulos === 0;
    botonPago.disabled = totalArticulos === 0;

    // Busca los datos completos de cada línea para mostrar nombre, precio e imagen
    articulosCarrito.innerHTML = estado.carrito.map((articulo) => {
        const producto = productos.find(
            (elemento) => elemento.identificador === articulo.identificador
        );

        return `
            <article class="articulo-carrito">
                <div class="imagen-articulo ${producto.color}" aria-hidden="true">${producto.icono}</div>
                <div class="detalles-articulo">
                    <h3>${producto.nombre}</h3>
                    <p>${formateadorMoneda.format(producto.precio)}</p>
                    <div class="controles-cantidad" aria-label="Cantidad de ${producto.nombre}">
                        <button type="button" data-cantidad="${producto.identificador}" data-cambio="-1"
                                aria-label="Quitar una unidad de ${producto.nombre}">−</button>
                        <span>${articulo.cantidad}</span>
                        <button type="button" data-cantidad="${producto.identificador}" data-cambio="1"
                                aria-label="Agregar una unidad de ${producto.nombre}">+</button>
                    </div>
                </div>
                <button class="boton-quitar" type="button" data-quitar="${producto.identificador}"
                        aria-label="Eliminar ${producto.nombre} del carrito">×</button>
            </article>`;
    }).join("");
}

// Actualiza el resumen y el costo de envío según el destino seleccionado.
function dibujarResumenPago() {
    const subtotal = estado.carrito.reduce((total, articulo) => {
        const producto = productos.find(
            (elemento) => elemento.identificador === articulo.identificador
        );
        return total + producto.precio * articulo.cantidad;
    }, 0);
    const costoEnvio = paisCliente.value === "mexico" ? 0 : 199;
    const total = subtotal + costoEnvio;
    const totalArticulos = estado.carrito.reduce(
        (cantidad, articulo) => cantidad + articulo.cantidad, 0);

    document.getElementById("cantidad-resumen").textContent =
        `${totalArticulos} ${totalArticulos === 1 ? "artículo" : "artículos"}`;
    document.getElementById("lineas-resumen").innerHTML = estado.carrito.map((articulo) => {
        const producto = productos.find(
            (elemento) => elemento.identificador === articulo.identificador
        );

        return `
            <div class="linea-resumen">
                <span class="icono-resumen ${producto.color}" aria-hidden="true">${producto.icono}</span>
                <div>
                    <h4>${producto.nombre}</h4>
                    <p>Cantidad: ${articulo.cantidad}</p>
                </div>
                <strong>${formateadorMoneda.format(producto.precio * articulo.cantidad)}</strong>
            </div>`;
    }).join("");

    document.getElementById("subtotal-pago").textContent = formateadorMoneda.format(subtotal);
    document.getElementById("envio-pago").textContent = costoEnvio === 0
        ? "Gratis"
        : formateadorMoneda.format(costoEnvio);
    document.getElementById("total-pago").textContent = formateadorMoneda.format(total);
    document.getElementById("boton-total-pago").textContent = formateadorMoneda.format(total);
}

// Borra los datos ingresados para no conservar información de pago en el formulario.
function limpiarFormularioPago() {
    formularioPago.reset();
    numeroTarjeta.setCustomValidity("");
}

// Despliega el panel adecuado
function abrirPanel(tipoPanel) {
    // Garantiza que solo un panel esté abierto a la vez
    cerrarPanel(false);
    estado.panelAbierto = tipoPanel;
    fondoPanel.hidden = false;

    if (tipoPanel === "filtros") {
        panelFiltros.classList.add("abierto");
        // inert y aria-hidden permiten interactuar con el panel solo cuando está abierto
        panelFiltros.inert = false;
        panelFiltros.setAttribute("aria-hidden", "false");
        botonAbrirFiltros.setAttribute("aria-expanded", "true");
        document.getElementById("cerrar-filtros").focus();
    } else {
        panelCarrito.classList.add("abierto");
        panelCarrito.inert = false;
        panelCarrito.setAttribute("aria-hidden", "false");
        botonAbrirCarrito.setAttribute("aria-expanded", "true");
        document.getElementById("cerrar-carrito").focus();
    }

    // Espera al siguiente cuadro para que el navegador anime la aparición del fondo
    requestAnimationFrame(() => fondoPanel.classList.add("visible"));
    document.body.classList.add("panel-abierto");
}

// Cierra el panel visible y, si corresponde, devuelve el foco al botón.
function cerrarPanel(devolverFoco = true) {
    const panelAnterior = estado.panelAbierto;

    // Oculta visualmente ambos paneles y también los retira de la navegación por teclado
    panelFiltros.classList.remove("abierto");
    panelCarrito.classList.remove("abierto");
    panelFiltros.inert = true;
    panelCarrito.inert = true;
    panelFiltros.setAttribute("aria-hidden", "true");
    panelCarrito.setAttribute("aria-hidden", "true");
    botonAbrirFiltros.setAttribute("aria-expanded", "false");
    botonAbrirCarrito.setAttribute("aria-expanded", "false");
    fondoPanel.classList.remove("visible");
    document.body.classList.remove("panel-abierto");
    estado.panelAbierto = null;

    // Espera a que termine el deslizamiento antes de retirar el fondo de la página
    window.setTimeout(() => {
        if (estado.panelAbierto === null) {
            fondoPanel.hidden = true;
        }
    }, 220);

    if (devolverFoco && panelAnterior) {
        // Regresa el foco al mismo botón que abrió el panel
        const botonAnterior = panelAnterior === "filtros"
            ? botonAbrirFiltros
            : botonAbrirCarrito;
        botonAnterior.focus();
    }
}

// Conecta búsqueda, orden, filtros y botones de los paneles desplegables
function inicializarCatalogo() {
    // Cada cambio en la búsqueda u orden vuelve a dibujar los productos
    campoBusqueda.addEventListener("input", (evento) => {
        estado.busqueda = evento.currentTarget.value;
        dibujarCatalogo();
    });

    selectorOrden.addEventListener("change", (evento) => {
        estado.orden = evento.currentTarget.value;
        dibujarCatalogo();
    });

    document.querySelectorAll(".boton-categoria").forEach((boton) => {
        boton.addEventListener("click", () => seleccionarCategoria(boton.dataset.categoria));
    });

    // Un solo listener atiende los botones de tarjetas creadas dinámicamente
    cuadriculaProductos.addEventListener("click", (evento) => {
        const botonAgregar = evento.target.closest("[data-agregar]");
        if (botonAgregar) {
            agregarAlCarrito(botonAgregar.dataset.agregar);
        }
    });

    // Un solo listener para los botnes
    articulosCarrito.addEventListener("click", (evento) => {
        const botonQuitar = evento.target.closest("[data-quitar]");
        const botonCantidad = evento.target.closest("[data-cantidad]");

        if (botonQuitar) {
            estado.carrito = estado.carrito.filter(
                (articulo) => articulo.identificador !== botonQuitar.dataset.quitar
            );
            dibujarCarrito();
        } else if (botonCantidad) {
            cambiarCantidad(
                botonCantidad.dataset.cantidad,
                Number(botonCantidad.dataset.cambio)
            );
        }
    });

    botonAbrirFiltros.addEventListener("click", () => abrirPanel("filtros"));
    botonAbrirCarrito.addEventListener("click", () => abrirPanel("carrito"));
    document.getElementById("cerrar-filtros").addEventListener("click", () => cerrarPanel());
    document.getElementById("cerrar-carrito").addEventListener("click", () => cerrarPanel());
    fondoPanel.addEventListener("click", () => cerrarPanel());

    document.addEventListener("keydown", (evento) => {
        // Escape cierra paneles y Ctrl + K lleva el cursor al campo de búsqueda
        if (evento.key === "Escape" && modalPago.open) {
            limpiarFormularioPago();
            modalPago.close();
            return;
        }

        if (evento.key === "Escape" && estado.panelAbierto) {
            cerrarPanel();
        }

        if ((evento.ctrlKey || evento.metaKey) && evento.key.toLowerCase() === "k") {
            evento.preventDefault();
            campoBusqueda.focus();
        }
    });

    botonPago.addEventListener("click", () => {
        if (estado.carrito.length === 0) {
            return;
        }

        dibujarResumenPago();
        modalPago.showModal();
        document.getElementById("nombre-cliente").focus();
    });

    paisCliente.addEventListener("change", dibujarResumenPago);
    modalPago.addEventListener("cancel", limpiarFormularioPago);
    numeroTarjeta.addEventListener("input", () => {
        const cantidadDigitos = numeroTarjeta.value.replace(/\D/g, "").length;
        numeroTarjeta.setCustomValidity(
            cantidadDigitos >= 13 && cantidadDigitos <= 19
                ? ""
                : "Ingresa de 13 a 19 dígitos."
        );
    });
    document.getElementById("cerrar-pago").addEventListener("click", () => {
        limpiarFormularioPago();
        modalPago.close();
    });
    document.getElementById("cancelar-pago").addEventListener("click", () => {
        limpiarFormularioPago();
        modalPago.close();
    });

    formularioPago.addEventListener("submit", (evento) => {
        evento.preventDefault();
        window.alert("¡Gracias! El pago de demostración se completó correctamente.");
        estado.carrito = [];
        dibujarCarrito();
        limpiarFormularioPago();
        modalPago.close();
        if (estado.panelAbierto) {
            cerrarPanel();
        }
    });

    dibujarCatalogo();
    dibujarCarrito();
}

inicializarCatalogo();
