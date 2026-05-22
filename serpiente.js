// 1. Capturamos el canvas y su contexto de dibujo
const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");
// Variables globales del juego
const TAMANIO_CELDA = 25; 
const serpiente = [
  { x: 5, y: 5 },
  { x: 4, y: 5 },
  { x: 3, y: 5 },
  { x: 2, y: 5 }
];

let intervaloMovimiento = null;
let direccionActual = "derecha";
let comida = { x: 0, y: 0 };
let puntaje = 0;


// Primera pintura del juego al cargar la página
dibujarTodo();
// =========================
// FUNCIONES DE DIBUJO
// =========================

function limpiarCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function dibujarTodo() {
  limpiarCanvas();
  dibujarTablero();
  pintarSerpiente();
  pintarComida();
}

function dibujarTablero() {
  ctx.strokeStyle = "#ffffff";
//generanos las cuadriculas 
  for (let x = 0; x <= canvas.width; x += TAMANIO_CELDA) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }

  for (let y = 0; y <= canvas.height; y += TAMANIO_CELDA) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }

}

function pintarParte(lineaX, lineaY, color) {
  let x = lineaX * TAMANIO_CELDA;
  let y = lineaY * TAMANIO_CELDA;
  
  ctx.fillStyle = color;

  ctx.fillRect(x, y, TAMANIO_CELDA, TAMANIO_CELDA);

  ctx.strokeStyle = "#14532d";
  ctx.strokeRect(x, y, TAMANIO_CELDA, TAMANIO_CELDA);
}

function pintarSerpiente() {
  for (let i = 0; i < serpiente.length; i++) {
    let parte = serpiente[i];
    if (i === 0) {
      pintarParte(parte.x, parte.y, "#11b2b4"); 
    } else {
      pintarParte(parte.x, parte.y, "#22c55e"); 
    }
    
  }
}

function cambiarDireccion(direccion) {

  // Evitar movimiento en dirección opuesta
  if (
    (direccion === "arriba" && direccionActual !== "abajo") ||
    (direccion === "abajo" && direccionActual !== "arriba") ||
    (direccion === "izquierda" && direccionActual !== "derecha") ||
    (direccion === "derecha" && direccionActual !== "izquierda")
  ) {
    direccionActual = direccion;
  }

  switch (direccionActual) {
    case "arriba":
      moverArriba();
      break;
    case "abajo":
      moverAbajo();
      break;
    case "izquierda":
      moverIzquierda();
      break;
    case "derecha":
      moverderecha();
      break;
  }
  dibujarTodo();
}

//Funciones de movieminto
function moverderecha() {
  let cabeza = serpiente[0];
  let nuevaCabeza = { x: cabeza.x + 1, y: cabeza.y };
  serpiente.unshift(nuevaCabeza);
  serpiente.pop();
}

function moverIzquierda() {
  let cabeza = serpiente[0];
  let nuevaCabeza = { x: cabeza.x - 1, y: cabeza.y };
  serpiente.unshift(nuevaCabeza);
  serpiente.pop();
}

function moverArriba() {
  let cabeza = serpiente[0];
  let nuevaCabeza = { x: cabeza.x, y: cabeza.y - 1 };
  serpiente.unshift(nuevaCabeza);
  serpiente.pop();
}

function moverAbajo() {
  let cabeza = serpiente[0];
  let nuevaCabeza = { x: cabeza.x, y: cabeza.y + 1 };
  serpiente.unshift(nuevaCabeza);
  serpiente.pop();
}

function moverSerpiente() {
  switch (direccionActual) {
    case "arriba":
      moverArriba();
      break;
    case "abajo":
      moverAbajo();
      break;
    case "izquierda":
      moverIzquierda();
      break;
    case "derecha":
      moverderecha();
      break;
  }

  if (atraparComida()) {
    puntaje++;
    document.getElementById("puntaje").textContent = puntaje;

    let cola = serpiente[serpiente.length - 1];
    let nuevaParte ;

    switch (direccionActual) {
      case "arriba":
        nuevaParte = { x: cola.x, y: cola.y + 1 };
        break;
      case "abajo":
        nuevaParte = { x: cola.x, y: cola.y - 1 };
        break;
      case "izquierda":
        nuevaParte = { x: cola.x + 1, y: cola.y };
        break;
      case "derecha":
        nuevaParte = { x: cola.x - 1, y: cola.y };
        break;
    }
    serpiente.push(nuevaParte);
  }
  dibujarTodo();
}

function iniciarJuego() {
  intervaloMovimiento = setInterval(moverSerpiente, 1000);
}

function pausarJuego(){
  clearInterval(intervaloMovimiento);
}

function pintarComida() {
  comida.x = Math.floor(Math.random() * (canvas.width / TAMANIO_CELDA));
  comida.y = Math.floor(Math.random() * (canvas.height / TAMANIO_CELDA));
  pintarParte(comida.x, comida.y, "#ef4444");
}

function atraparComida() {
  let cabeza = serpiente[0];
  if (cabeza.x === comida.x && cabeza.y === comida.y) {
    return true;
  }
  return false;
}
