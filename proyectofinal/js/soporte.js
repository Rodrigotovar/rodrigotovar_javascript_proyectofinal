document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('comment-form');

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Evita el comportamiento por defecto del formulario

        const formData = new FormData(form); // Recoge los datos del formulario

        // Convierte los datos del formulario a un objeto JSON
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // Envía los datos a una API usando fetch
        fetch('https://api.ficticia.com/comments', { // Reemplaza la URL con la API real
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error al enviar el comentario.');
            }
        })
        .then(data => {
            // Muestra un toast de éxito
            Toastify({
                text: "¡Comentario enviado con éxito!",
                duration: 3000,
                gravity: "top", // "top" or "bottom"
                position: "right", // "left", "center" or "right"
                backgroundColor: "#28a745", // Verde para éxito
                stopOnFocus: true, // Mantiene visible al hacer hover
            }).showToast();

            form.reset(); // Resetea el formulario después de enviar
        })
        .catch(error => {
            // Muestra un toast de error en caso de fallo
            Toastify({
                text: "Hubo un problema al enviar el comentario.",
                duration: 3000,
                gravity: "top", // "top" or "bottom"
                position: "right", // "left", "center" or "right"
                backgroundColor: "#dc3545", // Rojo para error
                stopOnFocus: true,
            }).showToast();

            console.error('Error:', error);
        });
    });
});
