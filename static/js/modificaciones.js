//const URL = "http://127.0.0.1:5000/"
//Al subir al servidor, deberá utilizarse la siguiente ruta. USUARIO debe ser reemplazado por el nombre de usuario de Pythonanywhere
const URL = "https://sballesillos.pythonanywhere.com/"

// Variables de estado para controlar la visibilidad y los datos del formulario
let codigo = '';
let descripcion = '';
let cantidad = '';
let precio = '';
let proveedor = '';
let mostrarDatosProducto = false;

document.getElementById('form-obtener-producto').addEventListener('submit', obtenerProducto);
document.getElementById('form-guardar-cambios').addEventListener('submit', guardarCambios);


// Se ejecuta cuando se envía el formulario de consulta. Realiza una solicitud GET a la API y obtiene los datos del producto correspondiente al código ingresado.
function obtenerProducto(event) {
    event.preventDefault();
    codigo = document.getElementById('codigo').value;
    
    fetch(URL + 'productos/' + codigo)

    .then(response => {
        if (response.ok) {
            return response.json()
        } else {
            throw new Error('Error al obtener los datos del producto.')
        }
    })

    .then(data => {
        descripcion = data.descripcion;
        cantidad = data.cantidad;
        precio = data.precio;
        proveedor = data.proveedor;
        mostrarDatosProducto = true; //Activa la vista del segundo formulario
        mostrarFormulario();
    })

    .catch(error => {
        alert('Código no encontrado.');
    });
}

// Muestra el formulario con los datos del producto
function mostrarFormulario() {
    if (mostrarDatosProducto) {
        document.getElementById('descripcionModificar').value = descripcion;
        document.getElementById('cantidadModificar').value = cantidad;
        document.getElementById('precioModificar').value = precio;
        document.getElementById('proveModificar').value = proveedor;

        document.getElementById('datos-producto').style.display = 'block';
    } else {
        document.getElementById('datos-producto').style.display = 'none';
    }
}


// Se usa para enviar los datos modificados del producto al servidor.
function guardarCambios(event) {
    event.preventDefault();
    const formData = new FormData();
    
    formData.append('codigo', codigo);
    formData.append('descripcion', document.getElementById('descripcionModificar').value);
    formData.append('cantidad', document.getElementById('cantidadModificar').value);
    formData.append('proveedor', document.getElementById('proveModificar').value);
    formData.append('precio', document.getElementById('precioModificar').value);
    
    
    fetch(URL + 'productos/' + codigo, {
        method: 'PUT',
        body: formData,
    })

    .then(response => {
        if (response.ok) {
            return response.json()
        } else {
            throw new Error('Error al guardar los cambios del producto.')
        }
    })

    .then(data => {
        alert('Producto actualizado correctamente.');
        limpiarFormulario();
    })

    .catch(error => {
        console.error('Error:', error);
        alert('Error al actualizar el producto.');
    });
}

// Restablece todas las variables relacionadas con el formulario a sus valores iniciales, lo que efectivamente "limpia" el formulario.
function limpiarFormulario() {
    document.getElementById('codigo').value = '';
    document.getElementById('descripcionModificar').value = '';
    document.getElementById('cantidadModificar').value = '';
    document.getElementById('precioModificar').value = '';
    document.getElementById('proveModificar').value = '';


    codigo = '';
    descripcion = '';
    cantidad = '';
    precio = '';
    proveedor = '';
    mostrarDatosProducto = false;
    document.getElementById('datos-producto').style.display = 'none';
}