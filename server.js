const http = require("http");
const path = require("path");
const fs = require("fs");
let rutaArchivo = "";

const PORT = 3000;
const MANTENIMIENTO = false;

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

/**
 * @description devuelve el contenido del archivo ubicado en la ruta rutaArchivo (incluye el nombre del archivo.)
 * @param {string} urlPedido
 * @returns {Buffer | undefined}
 */
function cargarArchivo(urlPedido) {
  rutaArchivo = urlPedido;
  console.log(`Pedido: ${rutaArchivo}`);

  if (rutaArchivo === "/") {
    rutaArchivo = urlPedido + "index.html";
    console.log(`Se cambia por: ${rutaArchivo}`);
  }

  rutaArchivo = path.join(__dirname, "/public", rutaArchivo);
  console.log(`Se cambia por: ${rutaArchivo}`);

  console.log(`Intentamos leer el archivo: ${rutaArchivo}`);
  try {
    return fs.readFileSync(rutaArchivo);
  } catch (/** @type {Error} */ error) {
    console.log(error.code);
      return undefined;
    }
  }

/**
 * @description Se usa para simular un servidor que no esta disponible.
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse} res
 */
function mantenimiento(req, res) {
  console.log(`El servidor no se encuentra disponible.`);
  res.writeHead(503);
  res.end(
    "503 Server Unavailable\nEl servidor aun no esta listo para mostrar la pagina."
  );
}

/**
 * @description respondemos con 404 cuando el servidor no puede resolver la ruta del archivo
 * que se pidio.
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse} res
 */
function noEncontrado(res) {
  console.log(`No se encontro el archivo pedido: ${rutaArchivo}`);
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
  }
  if (!indiceHTML) {
    noEncontrado(req, res);
  }

  res.setHeader("Content-Type", "text/html");
  res.writeHead(200);
  res.end(indiceHTML);
}

/**
 * @description Inicializa el servidor. Por el momento lo unico que hace es
 * mostrar un mensaje por consola para confirmar que el servidor ya inicio.
 */
function inicializar() {
  console.log(`Servidor escuchando en puerto ${PORT}`);
}
