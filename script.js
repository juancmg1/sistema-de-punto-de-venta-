document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    const mainContent = document.getElementById("main-content");

    const authForm = document.getElementById("form-principal");
    authForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if (username === "juan" && password === "123456") {
            loginForm.style.display = "none";
            mainContent.style.display = "block";
            const usernameDisplay = document.getElementById("username-display");
            usernameDisplay.textContent = "Vendedor: " + username
        } else {
            alert("Credenciales incorrectas. Por favor, inténtelo de nuevo.");
        }
    });
});




const productos = [
    { nombre: "Manzana", precio: 1.50 },
    { nombre: "Banana", precio: 0.75 },
    { nombre: "Naranja", precio: 1.25 },
    { nombre: "Pera", precio: 1.75 },
    { nombre: "Uvas", precio: 2.50 },
    { nombre: "Frutillas", precio: 2.00 },
    { nombre: "Sandía", precio: 3.50 },
    { nombre: "Melón", precio: 2.75 },
    { nombre: "Durazno", precio: 2.25 },
    { nombre: "Kiwi", precio: 1.80 },
    { nombre: "Mango", precio: 2.00 },
    { nombre: "Piña", precio: 1.95 },
    { nombre: "Cerezas", precio: 3.25 },
    { nombre: "Higo", precio: 2.20 },
    { nombre: "Almendras", precio: 4.00 },
    { nombre: "Nueces", precio: 3.75 },
    { nombre: "Palta", precio: 2.50 },
    { nombre: "Frambuesas", precio: 3.00 },
    { nombre: "Arándanos", precio: 3.50 },
    { nombre: "Ciruelas", precio: 1.90 },
    { nombre: "fruta del dragon", precio: 3}
];

const productListDiv = document.getElementById("productList");
const selectedProductsDiv = document.getElementById("selectedProducts");
const totalDiv = document.getElementById("total");

function actualizarListaProductos() {
    productListDiv.innerHTML = "";

    for (let i = 0; i < productos.length; i++) {
        const productDiv = document.createElement("button");
        productDiv.textContent = ` ${productos[i].nombre}, $${productos[i].precio}`;
        productDiv.classList.add("product-button");
        productDiv.addEventListener("click", () => agregarProducto(productos[i]));
        productListDiv.appendChild(productDiv);
    }
}

function agregarProducto(producto) {
    const selectedProductDiv = document.createElement("div");
    const productName = producto.nombre;
    const productPrice = producto.precio;
    
    selectedProductDiv.textContent = `Producto: ${productName}, Precio: $${productPrice}`;
    
    
    selectedProductsDiv.appendChild(selectedProductDiv);
    
    
    calcularTotal();
}

function calcularTotal() {
    const selectedProductDivs = selectedProductsDiv.children;
    let total = 0;

    for (let i = 0; i < selectedProductDivs.length; i++) {
        const productDiv = selectedProductDivs[i];
        const price = parseFloat(productDiv.textContent.split("$")[1]);
        total += price;
    }

    totalDiv.textContent = `Total: $${total.toFixed(2)}`;
    return total;
}


actualizarListaProductos();

const borrarProductoButton = document.getElementById("borrar-producto");
borrarProductoButton.addEventListener("click", borrarProductoSeleccionado);

function borrarProductoSeleccionado() {
    const selectedProductDivs = selectedProductsDiv.children;
    
    if (selectedProductDivs.length > 0) {
        
        selectedProductsDiv.removeChild(selectedProductDivs[selectedProductDivs.length - 1]);
       
        calcularTotal();
    }
}
const abrirModalButton = document.getElementById("abrir-modal");
const modal = document.getElementById("modal");
const cerrarModalButton = document.getElementById("cerrar-modal");
const guardarClienteButton = document.getElementById("guardar-cliente");
const clienteForm = document.getElementById("cliente-form");

abrirModalButton.addEventListener("click", () => {
    modal.style.display = "block";
});

cerrarModalButton.addEventListener("click", () => {
    modal.style.display = "none";
});

guardarClienteButton.addEventListener("click", () => {
    
    
    
        const nombre = document.getElementById("nombre").value;
        const tipoDNI = document.getElementById("tipo-dni").value;
        const numeroDNI = document.getElementById("numero-dni").value;
        const domicilio = document.getElementById("domicilio").value;
        const email = document.getElementById("email").value;
        const tipoFactura = document.getElementById("tipo-factura").value;
    
       
        console.log("Nombre del cliente: " + nombre);
        console.log("Tipo de DNI: " + tipoDNI);
        console.log("Número de DNI: " + numeroDNI);
        console.log("Domicilio del cliente: " + domicilio);
        console.log("Correo Electrónico del cliente: " + email);
        console.log("Tipo de Factura: " + tipoFactura);
    
        modal.style.display = "none";
    });
 

document.addEventListener("DOMContentLoaded", function () {
    const pagarButton = document.getElementById("pagarButton");
    pagarButton.addEventListener("click", generarComprobante);
});

function generarComprobante() {
    const nombre = document.getElementById("nombre").value;
    const tipoDNI = document.getElementById("tipo-dni").value;
    const numeroDNI = document.getElementById("numero-dni").value;
    const domicilio = document.getElementById("domicilio").value;
    const email = document.getElementById("email").value;
    const tipoFactura = document.getElementById("tipo-factura").value;

    
    const total = calcularTotal();

  
    const comprobante = {
        cliente: {
            nombre,
            tipoDNI,
            numeroDNI,
            domicilio,
            email,
            tipoFactura,
        },
        montoTotal: total,
    };

    const numComprobantes = parseInt(localStorage.getItem("numComprobantes")) || 0;
    const nuevoNumComprobantes = numComprobantes + 1;
    localStorage.setItem(`comprobante${nuevoNumComprobantes}`, JSON.stringify(comprobante));
    localStorage.setItem("numComprobantes", nuevoNumComprobantes);
    console.log("Comprobante generado:", comprobante);
    
    
}


    const pagarButton = document.getElementById("pagarButton");
    pagarButton.addEventListener("click", mostrarComprobante);

    const cerrarComprobanteButton = document.getElementById("cerrarComprobante");
    cerrarComprobanteButton.addEventListener("click", cerrarComprobante);


function mostrarComprobante() {
    
    const comprobanteModal = document.getElementById("comprobanteModal");
    const comprobanteInfo = document.getElementById("comprobanteInfo");

    
    const nombre = document.getElementById("nombre").value;
    const tipoDNI = document.getElementById("tipo-dni").value;
    const numeroDNI = document.getElementById("numero-dni").value;
    const domicilio = document.getElementById("domicilio").value;
    const email = document.getElementById("email").value;
    const tipoFactura = document.getElementById("tipo-factura").value;

    const total = calcularTotal();

    const comprobanteHTML = `
        <p><strong>Cliente:</strong> ${nombre}</p>
        <p><strong>Tipo de DNI:</strong> ${tipoDNI}</p>
        <p><strong>Número de DNI:</strong> ${numeroDNI}</p>
        <p><strong>Domicilio:</strong> ${domicilio}</p>
        <p><strong>Correo Electrónico:</strong> ${email}</p>
        <p><strong>Tipo de Factura:</strong> ${tipoFactura}</p>
        <p><strong>Monto Total:</strong> $${total}</p>
    `;

    
    comprobanteInfo.innerHTML = comprobanteHTML;

    comprobanteModal.style.display = "block";

    
}


function cerrarComprobante() {
    const comprobanteModal = document.getElementById("comprobanteModal");
    comprobanteModal.style.display = "none";
}



const mostrarComprobantesButton = document.getElementById("mostrarComprobantesButton");
const comprobanteModal = document.getElementById("comprobanteModal");
const comprobanteInfo = document.getElementById("comprobanteInfo");

mostrarComprobantesButton.addEventListener("click", mostrarComprobantesgenerados);

function mostrarComprobantesgenerados() {
    comprobanteInfo.innerHTML = ""; 

    for (let i = 1; i <= localStorage.getItem("numComprobantes"); i++) {
        const comprobanteKey = `comprobante${i}`;
        const comprobanteJSON = localStorage.getItem(comprobanteKey);

        if (comprobanteJSON) {
            const comprobante = JSON.parse(comprobanteJSON);
            const comprobanteHTML = `
                <p><strong>Cliente:</strong> ${comprobante.cliente.nombre}</p>
                <p><strong>Tipo de DNI:</strong> ${comprobante.cliente.tipoDNI}</p>
                <p><strong>Número de DNI:</strong> ${comprobante.cliente.numeroDNI}</p>
                <p><strong>Domicilio:</strong> ${comprobante.cliente.domicilio}</p>
                <p><strong>Correo Electrónico:</strong> ${comprobante.cliente.email}</p>
                <p><strong>Tipo de Factura:</strong> ${comprobante.cliente.tipoFactura}</p>
                <p><strong>Monto Total:</strong> $${comprobante.montoTotal}</p>
                <hr>
            `;
            comprobanteInfo.innerHTML += comprobanteHTML;
        }
    }

    comprobanteModal.style.display = "block";

}



