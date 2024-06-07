const http = require("http");
const path = require("path");
const fs = require("fs");

const PORT = 3000;
const MANTENIMIENTO = false;
const rutaArchivo = path.join(__dirname, "../sancamilo-front/index.html");
const indiceHTML = cargarArchivo();

/**
 * @description el objeto servidor que se va a utilizar para controlar el lifecycle y la configuracion del servidor.
 * @argument {http.RequestListener} servirFront
 */
const server = http.createServer(servirFront);

/**
 * @description comienza a escuchar pedidos en el puerto indicado por el argumento PORT.
 * @argument {() => void | undefined} inicializar es un callback que se llama una vez que el servidor ha comenzado a escuchar
 * pedidos en el puerto indicado.
 */
server.listen(PORT, inicializar);

function cargarArchivo() {
  try {
    return fs.readFileSync(rutaArchivo);
  } catch (/** @type {Error} */ error) {
    if (error.code === "ENOENT") {
      noEncontrado(req, res);
    }
  }
}

/**
 * @description Se usa para simular un servidor que no esta disponible.
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse} res
 */
function mantenimiento(req, res) {
  res.writeHead(503);
  res.end(
    "503 Server Unavailable\nEl servidor aun no esta listo para mostrar la pagina."
  );
  return;
}

/**
 * @description respondemos con 404 cuando el servidor no puede resolver la ruta del archivo
 * que se pidio.
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse} res
 */
function noEncontrado(req, res) {
  res.writeHead(404);
  res.end("404 La pagina no se encontro.");
}

/**
 * @description este listener intenta servir index.html del frontend. si no se encuentra el archivo
 * delega a una funcion para responder con 404
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse} res
 */
function servirFront(req, res) {
  if (MANTENIMIENTO) {
    mantenimiento(req, res);
  } else {
    res.setHeader("Content-Type", "text/html");
    res.writeHead(200);
    res.end(indiceHTML);
  }
}

/**
 * @description Inicializa el servidor. Por el momento lo unico que hace es
 * mostrar un mensaje por consola para confirmar que el servidor ya inicio.
 */
function inicializar() {
  console.log(`Servidor escuchando en puerto ${PORT}`);
}
