// Simulación de una API que devuelve productos
const apiEndpoint = 'https://fakestoreapi.com/products'; // URL de ejemplo

// Obtener productos desde una API usando fetch y promesas
function fetchProducts() {
    return fetch(apiEndpoint)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener productos');
            }
            return response.json(); // Parsear la respuesta a JSON
        })
        .then(data => {
            // Mapear productos de la API a nuestro formato
            return data.map((product, index) => ({
                id: index + 1,
                name: product.title,
                price: Math.floor(product.price), // Precio redondeado a entero
            }));
        })
        .catch(error => {
            console.error('Error al obtener productos:', error);
        });
}

// Inicializar carrito desde localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Función para actualizar el carrito en el DOM
function updateCart(products) {
    const cartItemsList = document.getElementById('cart-items');
    const totalAmount = document.getElementById('total-amount');
    let total = 0;
    
    cartItemsList.innerHTML = '';

    cart.forEach(item => {
        const product = products.find(p => p.id === item.id);
        if (product) {
            total += product.price * item.quantity;
            const listItem = document.createElement('li');
            listItem.textContent = `${product.name} x ${item.quantity} - $${product.price * item.quantity} MXN`;
            cartItemsList.appendChild(listItem);
        }
    });

    totalAmount.textContent = `Total: $${total} MXN`;
}

// Función para mostrar un toast
function showToast(message) {
    Toastify({
        text: message,
        duration: 3000,
        close: true,
        gravity: "top", // "top" or "bottom"
        position: "right", // "left", "center" or "right"
        backgroundColor: "#0088ab", // Background color
        stopOnFocus: true, // Prevent toast from disappearing on hover
    }).showToast();
}

// Añadir producto al carrito
function addToCart(productId, products) {
    const product = products.find(p => p.id === productId);
    if (!product) return; // Si no se encuentra el producto, no hacer nada

    const productIndex = cart.findIndex(item => item.id === productId);
    if (productIndex > -1) {
        cart[productIndex].quantity += 1;
    } else {
        cart.push({ id: productId, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart(products);
    showToast(`Has agregado el disco "${product.name}" al carrito.`);
}

// Vaciar carrito
function emptyCart(products) {
    cart = [];
    localStorage.removeItem('cart');
    updateCart(products);
    showToast('El carrito ha sido vaciado.');
}

// Ver carrito
function viewCart() {
    window.location.href = 'cart.html';
}

// Inicializar la funcionalidad de la página
fetchProducts().then(products => {
    if (!products) return;

    // Añadir eventos a los botones
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const productId = parseInt(button.getAttribute('data-product'));
            addToCart(productId, products);
        });
    });

    document.getElementById('empty-cart').addEventListener('click', () => {
        emptyCart(products);
    });

    document.getElementById('view-cart').addEventListener('click', viewCart);

    // Inicializar la visualización del carrito
    updateCart(products);
});
