let imagenes = [
    "imagenes/imgG/GAL1.jpg",
    "imagenes/imgG/GAL2.jpg",
    "imagenes/imgG/GAL3.jpg",
    "imagenes/imgG/GAL4.jpg",
    "imagenes/imgG/GAL5.jpg",
    "imagenes/imgG/GAL6.jpg",
    "imagenes/imgG/GAL7.jpg",
    "imagenes/imgG/GAL8.jpg",
    "imagenes/imgG/GAL9.jpg",
    "imagenes/imgG/GAL10.jpg",
    "imagenes/imgG/GAL11.jpg",
    "imagenes/imgG/GAL12.jpg",
    "imagenes/imgG/GAL13.jpg",
    "imagenes/imgG/GAL14.jpg",
    "imagenes/imgG/GAL15.jpg",
    "imagenes/imgG/GAL16.jpg",
    "imagenes/imgG/GAL17.jpg",
    "imagenes/imgG/GAL18.jpg",
    "imagenes/imgG/GAL19.jpg",
    "imagenes/imgG/GAL20.jpg"
];

let indiceActual = 0;

function actualizarCarrusel() {

    let anterior = (indiceActual - 1 + imagenes.length) % imagenes.length;
    let siguiente = (indiceActual + 1) % imagenes.length;

    document.getElementById("imgAnterior").src = imagenes[anterior];
    document.getElementById("imgCentro").src = imagenes[indiceActual];
    document.getElementById("imgSiguiente").src = imagenes[siguiente];
}

function siguienteImagen() {
    indiceActual = (indiceActual + 1) % imagenes.length;
    actualizarCarrusel();
}

function anteriorImagen() {
    indiceActual = (indiceActual - 1 + imagenes.length) % imagenes.length;
    actualizarCarrusel();
}

window.onload = actualizarCarrusel;

/*Formulario*/

const formulario = document.getElementById("formularioContacto");
const notificacion = document.getElementById("notificacion");

function mostrarNotificacion(mensaje, color){

    notificacion.textContent = mensaje;
    notificacion.style.backgroundColor = color;

    notificacion.style.visibility = "visible";
    notificacion.style.opacity = "1";

    setTimeout(() => {

        notificacion.style.opacity = "0";
        notificacion.style.visibility = "hidden";

    },3000);

}

formulario.addEventListener("submit", function(event){

    event.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value;
    const telefono = document.getElementById("telefono").value;
    const mensaje = document.getElementById("mensaje").value;

    if (
    nombre.trim() === "" ||
    correo.trim() === "" ||
    telefono.trim() === "" ||
    mensaje.trim() === ""
) {


    mostrarNotificacion("⚠️ Debes completar todos los campos.", "#ffc107");

    return;
}

    fetch("https://academiaaguilas-backend.onrender.com", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
                    nombre,
                    correo,
                    telefono,
                    mensaje
        })

    })
    .then(response => {

    if (!response.ok) {
        throw new Error("Error al enviar el correo");
    }

    return response.text();

})
    .then(data => {


        mostrarNotificacion("✅ Mensaje enviado correctamente.", "#28a745");


        formulario.reset();

    })
    .catch(error => {

        mostrarNotificacion("❌ Ocurrió un error al enviar el mensaje.", "#dc3545");


        console.log(error);

    });

});

// MAPA CONTACTO
const contenedorMapa = document.getElementById("mapa");

if (contenedorMapa) {

    const ubicacion = [4.562067757988813, -74.23619235889474];

    const mapa = L.map('mapa').setView(ubicacion, 15);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap'
    }).addTo(mapa);

    L.marker(ubicacion)
        .addTo(mapa)
        .bindPopup(`
            <b>Academia Águilas Fútbol Club</b><br>
            Dirección de entrenamiento
        `);
}
