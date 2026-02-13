const apiUrl = 'http://www.raydelto.org/agenda.php';

const formulario = document.getElementById('form');
formulario.addEventListener('submit', enviarContacto);


obtenerContactos();

function enviarContacto(e) {
    e.preventDefault();

    let nombre = document.getElementById('name').value;
    let apellido = document.getElementById('lastname').value;
    let telefono = document.getElementById('telephone').value;


    let nuevoContacto = {
        nombre: nombre,
        apellido: apellido,
        telefono: telefono
    };

    fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify(nuevoContacto)
    })
    .then(function(respuesta) {
        alert("Contacto guardado con éxito");
        location.reload(); 
    })
    .catch(function(error) {
        console.log("Error al enviar: " + error);
    });
}

function obtenerContactos() {
    fetch(apiUrl)
    .then(function(respuesta) {
        return respuesta.json();
    })
    .then(function(datos) {
        let tabla = document.getElementById('table');
        
        for (let i = 0; i < datos.length; i++) {
            let contacto = datos[i];
            
            let fila = document.createElement('tr');
            
            fila.innerHTML = `
                <td>${contacto.nombre}</td>
                <td>${contacto.apellido}</td>
                <td>${contacto.telefono}</td>
            `;
            
            tabla.appendChild(fila);
        }
    })
    .catch(function(error) {
        alert("Error al cargar la lista");
    });
}