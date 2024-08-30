// Array de productos
const products = [
    { id: 1, name: 'Sin Retorno al Principio', price: 200 },
    { id: 2, name: 'El Frio de la Primavera', price: 250 },
    { id: 3, name: 'De Patios Vacios Y Corazones Rotos', price: 180 },
    { id: 4, name: 'B(U)da', price: 220 },
    { id: 5, name: 'Sinergia', price: 270 },
    { id: 6, name: 'Pepe Levine', price: 230 },
    { id: 7, name: 'Oasis', price: 200 },
    { id: 8, name: 'Nocturno', price: 260 },
    { id: 9, name: 'Letras Vacías', price: 210 },
    { id: 10, name: 'De Estos Amores', price: 240 }
];

// Inicializar carrito desde localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Función para actualizar el carrito en el DOM
function updateCart() {
    const cartItemsList = document.getElementById('cart-items');
    const totalAmount = document.getElementById('total-amount');
    let total = 0;
    
    cartItemsList.innerHTML = '';

    cart.forEach(item => {
        const product = products.find(p => p.id === item.id);
        total += product.price * item.quantity;
        const listItem = document.createElement('li');
        listItem.textContent = `${product.name} x ${item.quantity} - $${product.price * item.quantity} MXN`;
        cartItemsList.appendChild(listItem);
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
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return; // Si no se encuentra el producto, no hacer nada

    const productIndex = cart.findIndex(item => item.id === productId);
    if (productIndex > -1) {
        cart[productIndex].quantity += 1;
    } else {
        cart.push({ id: productId, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
    showToast(`Has agregado el disco "${product.name}" al carrito.`);
}

// Vaciar carrito
function emptyCart() {
    cart = [];
    localStorage.removeItem('cart');
    updateCart();
    showToast('El carrito ha sido vaciado.');
}

// Ver carrito
function viewCart() {
    window.location.href = 'cart.html';
}

// Añadir eventos a los botones
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const productId = parseInt(button.getAttribute('data-product'));
        addToCart(productId);
    });
});

document.getElementById('empty-cart').addEventListener('click', emptyCart);
document.getElementById('view-cart').addEventListener('click', viewCart);

// Inicializar la visualización del carrito
updateCart();


