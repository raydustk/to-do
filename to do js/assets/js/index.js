document.addEventListener('DOMContentLoaded', () => {
    renderTareas();
});


//3 tareas iniciales
const tareas = [
    { id: 1, nombre: 'Lavar la ropa', realizada: false },
    { id: 2, nombre: 'Lavar los platos', realizada: false },
    { id: 3, nombre: 'Hacer las compras', realizada: true }
];

const agregarTarea = () => {
    event.preventDefault();
    const inputNuevaTarea = document.getElementById('inputNuevaTarea');
    const nombreTarea = inputNuevaTarea.value.trim();

    if (!nombreTarea) {
        alert('Por favor, ingrese un nombre para la tarea:');
        return; 
    }

    const nuevaTarea = {
        id: tareas.length + 1,
        nombre: nombreTarea,
        realizada: false
    };

    tareas.push(nuevaTarea);
    inputNuevaTarea.value = '';
    renderTareas();
};

const renderTareas = () => {
    const contenedorTareas = document.getElementById('listaTareas');
    contenedorTareas.innerHTML = ''; 
    tareas.forEach(tarea => {
        const tareaElemento = document.createElement('div');
        tareaElemento.classList.add('row');
        tareaElemento.innerHTML = `
            <div class="col">${tarea.id}</div>
            <div class="col">${tarea.nombre}</div>
            <div class="col">
                <input type="checkbox" ${tarea.realizada ? 'checked' : ''} onchange="toggleRealizada(${tarea.id})">
            </div>
            <div class="col">
                <div style="cursor: pointer;" onclick="eliminarTarea(${tarea.id})">X</div>
            </div>
        `;
        contenedorTareas.appendChild(tareaElemento);
    });

    actualizarContadores();
};

const toggleRealizada = (id) => {
    const index = tareas.findIndex(t => t.id === id);
    if (index !== -1) {
        tareas[index].realizada = !tareas[index].realizada;
        renderTareas();
    }
};

const eliminarTarea = (id) => {
    const index = tareas.findIndex(t => t.id === id);
    tareas.splice(index, 1);
    renderTareas();
};

const actualizarContadores = () => {
    const totalTareas = tareas.length;
    const totalTareasRealizadas = tareas.filter(t => t.realizada).length;
    document.getElementById('totalTareas').textContent = `Total: ${totalTareas}`;
    document.getElementById('totalTareasRealizadas').textContent = `Realizadas: ${totalTareasRealizadas}`;
};
