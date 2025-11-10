let coches = [];

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
  mostrarConfirmacion(coche);
  document.getElementById('formulario').reset();

}

function eliminarCoche() {
  const marca = prompt('Introduce la marca del coche a eliminar:').trim().toLowerCase();
  const index = coches.findIndex(c => c.marca.toLowerCase() === marca);

  if (index !== -1) {
    coches.splice(index, 1);
    window.alert(`Coche con marca "${marca}" eliminado.`);
    actualizarLista();
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

  window.alert(`Vehículos registrados: ${coches.length}`);
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

function DetenerHora() {

  if (myInterval) {
    clearInterval(myInterval);
    myInterval = null; //lo pone a null para saber que está parado
  } else {
    myInterval = setInterval(mostrarHora, 1000);
  }
}