// Cotizador Costructor

function Seguro(marca, anio, tipo) {
  this.marca = marca;
  this.anio = anio;
  this.tipo = tipo;
}

Seguro.prototype.cotizarSeguro = function () {
  /*
  1 = americano 1.15
  2 = asiatico 1.05
  3 = europeo 1.35
  // */

  let cantidad;
  const base = 2000;

  switch (this.marca) {
    case '1':
      cantidad = base * 1.15;
      break;
    case '2':
      cantidad = base * 1.05;
      break;
    case '3':
      cantidad = base * 1.35;
      break;
  }
  //leer fecha
  const diferencia = new Date().getFullYear() - this.anio;
  // //Cada año de diferencia se reduce 3% el valor del seguro
  cantidad -= (diferencia * 3 * cantidad) / 100;
  console.log(cantidad);
  /*Si el seguro es basico se multiplica por el 30% mas
  si e seguro es completo se multiplica por 50% más */
  if (this.tipo === 'basico') {
    cantidad *= 1.3;
  } else {
    cantidad *= 1.5;
  }
  return cantidad;
};

// Todo lo que se muestre
function Interfaz() {}
//Mensaje que imprime en html
Interfaz.prototype.mostrarError = function (mensaje, tipo) {
  const div = document.createElement('div');
  if (tipo === 'error') {
    div.classList.add('mensaje', 'error');
  } else {
    div.classList.add('mensaje', 'correcto');
  }
  div.innerHTML = `${mensaje}`;
  formulario.insertBefore(div, document.querySelector('.form-group'));

  setTimeout(function () {
    document.querySelector('.mensaje').remove();
  }, 3000);
};

Interfaz.prototype.mostrarResultado = function (seguro, total) {
  const resultado = document.getElementById('resultado');

  let marca;
  switch ((seguro, marca)) {
    case '1':
      marca = Americano;
      break;
    case '2':
      marca = Asiatico;
      break;
    case '3':
      marca = Europeo;
      break;
  }
  //Crear Div
  const div = document.createElement('div');
  div.innerHTML = `
    <p class='header'> Tu Resumen: </p>
    <p> Marca: ${seguro.marca} </p>
    <p> Año: ${marca} </p>
    <p> Tipo: ${seguro.tipo} </p>
    <p> Total: $ ${total} </p>
  `;
  const spinner = document.querySelector('#cargando img');
  spinner.style.display = 'block';
  setTimeout(function () {
    spinner.style.display = 'none';
    resultado.appendChild(div);
  }, 3000);
};

//EventListeners
const formulario = document.getElementById('cotizar-seguro');

formulario.addEventListener('submit', function (e) {
  e.preventDefault();
  const marca = document.getElementById('marca');
  //Leer marca seleccionada del select
  const marcaSeleccionada = marca.options[marca.selectedIndex].value;
  //leer el anio seleccionado
  const anio = document.getElementById('anio');
  const anioSeleccionado = anio.options[anio.selectedIndex].value;
  //Leer el radio button
  const tipo = document.querySelector('input[name="tipo"]:checked').value;

  //CREAR INSTACION DE INTERFAZ
  const interfaz = new Interfaz();
  //Validacion de campos
  if (marcaSeleccionada === '' || anioSeleccionado === '' || tipo === '') {
    //Faltan campos
    interfaz.mostrarError(
      'Faltan datos, revisar el formulario y prueba de nuevo',
      'error'
    );
  } else {
    //Limpiar resultados anteriores
    const resultados = document.querySelector('#resultados div');
    if (resultados != null) {
      resultados.remove();
    }

    //todos los campos estan correctamente llenos
    const seguro = new Seguro(marcaSeleccionada, anioSeleccionado, tipo);
    //Cotizar el seguro
    const cantidad = seguro.cotizarSeguro(seguro);
    interfaz.mostrarResultado(seguro, cantidad);
  }
});

const max = new Date().getFullYear(),
  min = max - 20;

const selectAnios = document.getElementById('anio');

for (let i = max; i > min; i--) {
  let option = document.createElement('option');
  option.value = i;
  option.innerHTML = i;
  selectAnios.appendChild(option);
}
