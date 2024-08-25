// Variables globales
let cart = [];
const productPrice = 500; // Precio por producto

// Actualiza el contenido del carrito en la interfaz
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const totalAmount = document.getElementById('total-amount');
    
    // Limpiar la lista de artículos del carrito
    cartItems.innerHTML = '';
    
    // Agregar los artículos al carrito
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `Producto ${item.productId} - ${item.quantity} x ${productPrice} MXN`;
        cartItems.appendChild(li);
    });
    
    // Calcular y mostrar el total
    const total = cart.reduce((sum, item) => sum + item.quantity * productPrice, 0);
    totalAmount.textContent = `Total: ${total} MXN`;
}

// Agrega un producto al carrito
function addToCart(productId) {
    const existingProduct = cart.find(item => item.productId === productId);
    
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ productId: productId, quantity: 1 });
    }
    
    updateCart();
}

// Vacía el carrito
function emptyCart() {
    cart = [];
    updateCart();
}

// Event listeners para los botones
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (event) => {
        const productId = parseInt(event.target.getAttribute('data-product'));
        addToCart(productId);
    });
});

document.getElementById('empty-cart').addEventListener('click', emptyCart);
