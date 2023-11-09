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




fetch("productos.json")
  .then(response => response.json())
  .then(data => {
    const productos = data.productos;
    const productListContainer = document.getElementById("productList");
    productListContainer.className = "pepe";

    productos.forEach((producto, i) => { 
      const productElement = document.createElement("button");
      productElement.textContent = ` ${producto.nombre}, $${producto.precio}`;
      productElement.classList.add("product-button");
      productElement.addEventListener("click", () => agregarProducto(productos[i])); 

      productListContainer.append(productElement);
    });
  });



const productListDiv = document.getElementById("productList");
const selectedProductsDiv = document.getElementById("selectedProducts");
const totalDiv = document.getElementById("total");



function agregarProducto(producto) {
    const selectedProductDiv = document.createElement("div");
    const productName = producto.nombre;
    const productPrice = producto.precio;
  
    selectedProductDiv.textContent = `Producto: ${productName}, Precio: $${productPrice}`;
  
    const selectedProductsDiv = document.getElementById("selectedProducts"); 
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
    modal.style.display = "flex";
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
        const tipoPago = document.getElementById("tipo-pago").value;


        console.log("Nombre del cliente: " + nombre);
        console.log("Tipo de DNI: " + tipoDNI);
        console.log("Número de DNI: " + numeroDNI);
        console.log("Domicilio del cliente: " + domicilio);
        console.log("Correo Electrónico del cliente: " + email);
        console.log("Tipo de Factura: " + tipoFactura);
        console.log("Tipo de Pago: " + tipoPago);

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
    const tipoPago = document.getElementById("tipo-pago").value;



    const total = calcularTotal();





    const comprobante = {
        cliente: {
            nombre,
            tipoDNI,
            numeroDNI,
            domicilio,
            email,
            tipoFactura,
            tipoPago,
        },
        montoTotal: total,
    };
    if (tipoPago === "efectivo") {
        totalEfectivo += total;
    } else if (tipoPago === "tarjeta") {
        totalTarjeta += total;
    }

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
    const tipoPago = document.getElementById("tipo-pago").value;

    const total = calcularTotal();

    const comprobanteHTML = `
        <p><strong>Cliente:</strong> ${nombre}</p>
        <p><strong>Tipo de DNI:</strong> ${tipoDNI}</p>
        <p><strong>Número de DNI:</strong> ${numeroDNI}</p>
        <p><strong>Domicilio:</strong> ${domicilio}</p>
        <p><strong>Correo Electrónico:</strong> ${email}</p>
        <p><strong>Tipo de Factura:</strong> ${tipoFactura}</p>
        <p><strong>Tipo de pago:</strong> ${tipoPago}</p>
        <p><strong>Monto Total:</strong> $${total}</p>
    `;


    comprobanteInfo.innerHTML = comprobanteHTML;

    comprobanteModal.style.display = "flex";


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
                <p><strong>Tipo de Pago:</strong> ${comprobante.cliente.tipoPago}</p>
                <p><strong>Tipo de Factura:</strong> ${comprobante.cliente.tipoFactura}</p>
                <p><strong>Monto Total:</strong> $${comprobante.montoTotal}</p>
                <hr>
            `;
            comprobanteInfo.innerHTML += comprobanteHTML;
        }
    }

    comprobanteModal.style.display = "flex";

}

let totalEfectivo = 0;
let totalTarjeta = 0;
