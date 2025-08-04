const API_URL = 'https://localhost:3000/api/equipos';

async function obtenerequipos() {
    const res = await fetch(API_URL);
    const eqipos = await res.json();
    return equipos;
}

async function crearequipo(data) {
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    return await res.json();
}

async function actualizarequipo(id, data) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    return await res.json();

}

async function eliminarequipo() {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });

    return await res.json();
    
}

//Referencias a los elementos del DOM
const equipoList = document.getElementById('Contenedordocards'); 
const template = document.getElementById('Contenedordocards'); 
const dataForm = document.getElementById('data-form');
const nombre = document.getElementById('nombre');
const btnCancelar = document.getElementById('btn-cancelar');

//Mostrar equipos al cargar la pagina 
async function mostrarequipos() {
    contenedorCards.innerHTML = '';
    const equipos = await obtenerequipos();
    equipos.forEach(equipo => {
        const clone = template.content.cloneNode(true);
        clone.querySelector('.nombreequipo').textContent = equipo.nombre;
        clone.querySelector('.btn-editar').onclick = ()  => cargarequipoparaEditar(equipo);
        clone.querySelector('.btn-eliminar').onclick = () =>  eliminarequipoHandler(equipo.id_equipo);
        contenedorCards.appendChild(clone);
    });
    
}

//Guardar o Atualizar equipo
dataForm.onsubmit = async (e) => {
    e.preventDefault();
    const data = {
        nombre: nombre.value
    };

    if (dataForm.dataset.id) {
        await actualizarequipo(dataForm.dataset.id, data);
    } else {
        await crearequipo(data);
    }

    dataForm.reset();
    dataForm.removeAttribute('data-id');
    btnCancelar.style.display = 'none';
    mostrarequipos();
}

//cargar equipo para editar
function cargarequipoparaEditar(equipo) {
    id_equipo,value = equipo.id_equipo;
}

//eliminar equipo
async function eliminarequipoHandler(id) {
    if (confirm('¿Estás seguro de que quieres eliminar este equipo?')) {
        await eliminarequipo(id);
        mostrarequipos();
    }
}

mostrarequipos();