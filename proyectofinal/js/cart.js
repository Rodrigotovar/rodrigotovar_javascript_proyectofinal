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
let discountCode = 'DISCOUNT10'; // Código de descuento ficticio para ejemplo
let discountValue = 0.10; // 10% de descuento

// Función para actualizar el carrito en el DOM
function updateCart() {
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

    // Aplicar descuento si se ha introducido un código válido
    const discount = (discountCode === document.getElementById('discount-code').value.toUpperCase()) ? total * discountValue : 0;
    total -= discount;

    totalAmount.textContent = `Total: $${total} MXN`;
}

// Función para aplicar descuento
function applyDiscount() {
    updateCart();
}

// Función para vaciar el carrito
function emptyCart() {
    cart = [];
    localStorage.removeItem('cart');
    updateCart();
}

// Inicializar la visualización del carrito
updateCart();

// Añadir eventos a los botones
document.getElementById('apply-discount').addEventListener('click', applyDiscount);
document.getElementById('empty-cart').addEventListener('click', emptyCart);
