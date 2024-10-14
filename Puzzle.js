let posicionCeldaVacia = 16;
let empezarTiempo = Date.now();


function mezclarFichas() {
  //Inicio variable que empieza el tiempo en milisegundos
  empezarTiempo = Date.now();
  //Recorro todas las fichas
  for (let i = 1; i <= 15; i++) {
    //Marco un principio aleatorio
    let principioAleatorio = Math.floor(Math.random() * (i + 1)); 
    // Seleciono la ficha celda actual
    let celdaActual = document.getElementById("celda" + i);
    // aleatoria  usa el principio aleatorio
    let celdaAleatoria = document.getElementById("celda" + principioAleatorio);
    //Se guarda el valor del fondo de la celda actual
    let temp = celdaActual.style.backgroundImage;
    //Aqui cambiamos las fotos de las 2 celdas que nos importan
    celdaActual.style.backgroundImage = celdaAleatoria.style.backgroundImage;
    celdaAleatoria.style.backgroundImage = temp;
  }
}



function comprueboVictoria() {
  //Recorro todas las fichas
  for (let i = 1; i <= 15; i++) {
    //Añado el id a cada celda actual
    let celdaActual = document.getElementById("celda" + i);
    //le añado imagen a la celda actual
    let imagenCeldaActual = celdaActual.style.backgroundImage;
    //Añado el numero a la imagen para que esta cambie
    let nombreImagen = `url(img/${i}.gif)`; //imagen se encuentra en la carpeta "img" valor i.gif

    //Comprueba si el nombre de la imagen que viene es igual a la actual
    if (imagenCeldaActual !== nombreImagen) {
      /*Si la imagen actual no es igual a la imagen esperada,el juego no ha sido ganado. */
      return false;
    }
  }
  //Si las imagenes coinciden en orden has ganado la partida
  return true;
}


function moverCelda(celda) {
  let celdaId = parseInt(celda.id.replace("celda", ""));

  // Verifica si la celda clicada está al lado a la celda vacía
  if (
    (Math.abs(posicionCeldaVacia - celdaId) === 1 && Math.floor((celdaId - 1) / 4) === Math.floor((posicionCeldaVacia - 1) / 4)) ||
    (Math.abs(posicionCeldaVacia - celdaId) === 4)
  ) {
    // Intercambia las imágenes de la celda clicada y la celda vacía
    let temp = celda.style.backgroundImage;
    celda.style.backgroundImage = document.getElementById("celda" + posicionCeldaVacia).style.backgroundImage;
    document.getElementById("celda" + posicionCeldaVacia).style.backgroundImage = temp;

    // Actualiza la posición de la celda vacía
    posicionCeldaVacia = celdaId;

    // Si ganas, muestra el mensaje
    if (comprueboVictoria()) {
      let tiempoFinal = Date.now();
      let tiempoTotal = (tiempoFinal - empezarTiempo) / 1000;
      console.log(`¡Has completado el puzzle en ${tiempoTotal} segundos!`);
      alert(`¡Felicidades! Has completado el puzzle en ${tiempoTotal} segundos.`);
    }
  }
}


// Recorro sobre las casillas 
for (let i = 1; i <= 16; i++) {
  // Cogemos del HTML la celda
  let celda = document.getElementById("celda" + i);
  // Si la celda es distinta a la 16 le ponemos la imagen que toca
  if (i !== 16) {
    celda.style.backgroundImage = `url(img/${i}.gif)`;
  }
  // Le damos a todas las celdas el manejador de eventos de click definido anteriormente
  celda.addEventListener("click", function () {
    moverCelda(this);
  });
}

buton = document.getElementById("finPuzzle");
buton.addEventListener("click", resolverPuzzle);

function resolverPuzzle() {
  // Restauramos el orden original de las celdas
  for (let i = 1; i <= 16; i++) {
    let celdaActual = document.getElementById("celda" + i);
    celdaActual.style.backgroundImage = `url(img/${i}.gif)`;
  }

  // La última celda (la vacía) la dejamos en blanco
  document.getElementById("celda16").style.backgroundImage = "none";

  // Reseteamos la posición de la celda vacía
  posicionCeldaVacia = 16;
}

// Obtén el botón de desordenar
 botonDesordenar = document.getElementById("desordenarPuzzle");

// Agrega un evento de clic al botón
botonDesordenar.addEventListener("click", desordenarPuzzle);


function desordenarPuzzle() {
  // Mezcla las fichas nuevamente
  mezclarFichas();

  // Restablece el tiempo de inicio
  empezarTiempo = Date.now();
}




// Mezclamos el tablero
mezclarFichas();
