document.addEventListener('DOMContentLoaded', () => {
    // Obtén el formulario y añade un manejador para el evento submit
    const form = document.getElementById('comment-form');
    
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Previene el envío normal del formulario

        // Mostrar mensaje usando Toastify
        Toastify({
            text: "¡Te vamos a leer!",
            duration: 3000,
            gravity: "top", // "top" or "bottom"
            position: "right", // "left", "center" or "right"
            backgroundColor: "#0088ab", // Puedes ajustar el color de fondo aquí
            stopOnFocus: true, // Previene que el toast desaparezca al pasar el ratón sobre él
        }).showToast();

        // Opcional: puedes resetear el formulario aquí si lo deseas
        form.reset();
    });
});