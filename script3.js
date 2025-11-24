let coches = [];
const btnAgregarCoche = document.getElementById('btnagregacoche');
btnAgregarCoche.addEventListener('click', agregarCoche);
const btnFinalizar = document.getElementById('btnfinalizar');
btnFinalizar.addEventListener('click', finalizar);
const btnEliminarMarca = document.getElementById('btneliminarmarca');
btnEliminarMarca.addEventListener('click', eliminarCoche);
const btnmostrarTodos = document.getElementById('btnmostrartodos');
btnmostrarTodos.addEventListener('click', mostrarCoches);


function capturarDatos() {
  const marca = document.getElementById('marca').value.trim();
  const año = parseInt(document.getElementById('año').value);
  const categoria = document.getElementById('categoria').value;
  const reparado = document.querySelector('input[name="reparado"]:checked').value === "true";

  return { marca, año, categoria, reparado };
}


function agregarCoche() {
  const coche = capturarDatos();

  if (!coche.marca || isNaN(coche.año)) {
    window.alert('Por favor, completa todos los campos.');
    return;
  }

  if (coche.marca.length > 30) {
    window.alert('La marca no puede tener más de 30 caracteres.');
    return;
  }

  if (coche.año < 1900 || coche.año > 2025) {
    window.alert('El año debe estar entre 1900 y 2025.');
    return;
  }

  const duplicado = coches.some(c => c.marca.toLowerCase() === coche.marca.toLowerCase());
  if (duplicado) {
    window.alert('Ya has registrado un coche con esa marca.');
    return;
  }

  coches.push(coche);

  // MOSTRAR CONFIRMACIÓN EN ALERT
  mostrarConfirmacion(coche);

  // GUARDAR EN LOCAL STORAGE
  localStorage.setItem('coches', JSON.stringify(coches));

  // NUEVO: Mostrar en pantalla automáticamente
  actualizarLista();

  // Limpiar formulario
  document.getElementById('formulario').reset();
}

function eliminarCoche() {
  const marca = prompt('Introduce la marca del coche a eliminar:').trim().toLowerCase();
  const index = coches.findIndex(c => c.marca.toLowerCase() === marca);

  if (index !== -1) {
    coches.splice(index, 1);
    window.alert(`Coche con marca "${marca}" eliminado.`);
    actualizarLista();
    localStorage.setItem('coches', JSON.stringify(coches));
  } else {
    window.alert('No se encontró ningún coche con esa marca.');
  }
}

function mostrarCoches() {
  if (coches.length === 0) {
    window.alert('No hay vehículos registrados.');
    return;
  }

  let mensaje = 'Vehículos registrados:\n';
  coches.forEach((c, i) => {
    mensaje += `#${i + 1} → Marca: ${c.marca}, Año: ${c.año}, Categoría: ${c.categoria}, Reparado: ${c.reparado ? 'Sí' : 'No'}\n`;
  });

  window.alert(mensaje);
}

function finalizar() {
  if (coches.length === 0) {
    window.alert('No hay vehículos registrados.');
    return;
  }

  coches.sort((a, b) => a.marca.localeCompare(b.marca));
  console.log('Lista de vehículos ordenados:');
  coches.forEach((coche, index) => {
    console.log(`#${index + 1} → Marca: ${coche.marca}, Año: ${coche.año}, Categoría: ${coche.categoria}, Reparado: ${coche.reparado}`);
  });
}

function actualizarLista() {
  const lista = document.getElementById('lista');
  lista.innerHTML = '';

  coches.forEach(c => {
    const item = document.createElement('li');
    item.textContent = `${c.marca} (${c.año}) - ${c.categoria} - Reparado: ${c.reparado ? 'Sí' : 'No'}`;
    lista.appendChild(item);
  });
}

function mostrarConfirmacion(coche) {
  window.alert(`Vehículo agregado:\nMarca: ${coche.marca}\nAño: ${coche.año}\nCategoría: ${coche.categoria}\nReparado: ${coche.reparado ? 'Sí' : 'No'}`);
}
// Reloj simplificado: una función que muestra la hora y llama a setInterval internamente
function mostrarHora() {
  let ahora = new Date();
  const container = document.getElementById('reloj');
  container.innerHTML = `
    <div class="hora">
      <span>${ahora.toLocaleTimeString()}</span>
    </div>`; 
}

let myInterval = setInterval(mostrarHora, 1000);

document.getElementById('pararReloj').onclick = function() {

  if (myInterval) {
    clearInterval(myInterval);
    myInterval = null; //lo pone a null para saber que está parado
  } else {
    myInterval = setInterval(mostrarHora, 1000);
  }
}

document.getElementById('añadirLocalStorage').onclick = function() {
  localStorage.setItem('nombre', 'Obaseki Nosa');
  localStorage.setItem('edad', '29');
  window.alert('Datos añadidos a LocalStorage');
}

//COLOR DEL RELOJ

const clock = document.getElementById("reloj");
const select = document.getElementById("selectorColor");
const savedColor = localStorage.getItem("colorReloj");

if (savedColor) {
  clock.style.color = savedColor;
  select.value = savedColor;
}

select.addEventListener("change", () => {
  const color = select.value;
  clock.style.color = color;
  localStorage.setItem("colorReloj", color);
});

window.onload = () => {
  const guardados = localStorage.getItem('coches');
  if (guardados) {
    coches = JSON.parse(guardados);
    actualizarLista(); // mostrar en pantalla los guardados
  }
};