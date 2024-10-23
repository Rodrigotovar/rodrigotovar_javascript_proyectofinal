// Inicialización del carrito desde localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let discountCode = 'DISCOUNT10'; // Código de descuento ficticio
let discountValue = 0.10; // 10% de descuento
let products = []; // Inicialmente vacío, se llenará desde la API

// Función para obtener productos desde una API ficticia (puedes cambiar la URL por la real)
function fetchProducts() {
    fetch('https://api.ficticia.com/products') // Cambia la URL por la correcta
        .then(response => response.json())
        .then(data => {
            products = data; // Guardamos los productos traídos de la API
            displayProducts(); // Mostramos los productos en el DOM
        })
        .catch(error => {
            console.error('Error al obtener los productos:', error);
        });
}

// Función para mostrar productos en el DOM
function displayProducts() {
    const productsList = document.getElementById('products-list');
    productsList.innerHTML = ''; // Limpiamos el contenedor

    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.className = 'col-md-4 mb-3';
        productItem.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">Precio: $${product.price} MXN</p>
                    <button class="btn btn-primary add-to-cart" data-product="${product.id}">Agregar al carrito</button>
                </div>
            </div>
        `;
        productsList.appendChild(productItem);
    });

    // Agregar eventos a los botones de añadir al carrito
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const productId = parseInt(button.getAttribute('data-product'));
            addToCart(productId);
        });
    });
}

// Función para actualizar el carrito en el DOM
function updateCart() {
    const cartItemsList = document.getElementById('cart-items');
    const totalAmount = document.getElementById('total-amount');
    let total = 0;

    cartItemsList.innerHTML = ''; // Limpiar lista del carrito

    cart.forEach(item => {
        const product = products.find(p => p.id === item.id);
        if (product) {
            total += product.price * item.quantity;
            const listItem = document.createElement('li');
            listItem.textContent = `${product.name} x ${item.quantity} - $${product.price * item.quantity} MXN`;
            cartItemsList.appendChild(listItem);
        }
    });

    // Aplicar descuento si el código es válido
    const discount = (discountCode === document.getElementById('discount-code').value.toUpperCase()) ? total * discountValue : 0;
    total -= discount;

    totalAmount.textContent = `Total: $${total.toFixed(2)} MXN`;
    localStorage.setItem('cart', JSON.stringify(cart)); // Actualizar carrito en localStorage
}

// Función para añadir un producto al carrito
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const productIndex = cart.findIndex(item => item.id === productId);
    if (productIndex > -1) {
        cart[productIndex].quantity += 1;
    } else {
        cart.push({ id: productId, quantity: 1 });
    }
    updateCart();
    showToast(`Has agregado el disco "${product.name}" al carrito.`);
}

// Función para vaciar el carrito
function emptyCart() {
    cart = [];
    localStorage.removeItem('cart');
    updateCart();
}

// Función para mostrar un toast
function showToast(message) {
    Toastify({
        text: message,
        duration: 3000,
        close: true,
        gravity: "top", // "top" or "bottom"
        position: "right", // "left", "center" or "right"
        backgroundColor: "#0088ab", // Color de fondo
        stopOnFocus: true, // No desaparecer al pasar el mouse
    }).showToast();
}

// Función para aplicar descuento
function applyDiscount() {
    updateCart();
}

// Inicializar carrito y productos al cargar la página
fetchProducts();
updateCart();

// Añadir eventos a los botones
document.getElementById('apply-discount').addEventListener('click', applyDiscount);
document.getElementById('empty-cart').addEventListener('click', emptyCart);
