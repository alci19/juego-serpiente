// 1. Capturamos el canvas y su contexto de dibujo
const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");
const TAMANIO_CELDA = 25; 
const serpiente = [
  { x: 5, y: 5 },
  { x: 4, y: 5 },
  { x: 3, y: 5 },
  { x: 2, y: 5 }
];

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


