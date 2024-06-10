/*
Este bloque contiene los requires/imports del proyecto
*/
import Formulario from "./src/formulario.js";
import fs from "fs";
import http from "http";
import path from "path";
import { fileURLToPath, URL } from "url";

/** @type {string} la ruta de este archivo server.js en el servicio en el que este hospedado. */
const __filename = fileURLToPath(import.meta.url);
/** @type {string} el nombre del directorio en donde se encuentra este archivo. */
const __dirname = path.dirname(__filename);

/*
Este bloque contiene las instrucciones a ejecutar para poner en marcha el servidor
*/

/** @type {Buffer} El contenido del recurso que vamos a servir en la respuesta. */
let contenido;

/** @type {http.ServerResponse} Mantengo una referencia global en todo mi servidor al objeto response que recibimos junto con el pedido http. */
let respuesta;

/** @type {http.IncomingMessage} Mantengo una referencia global al pedido http que recibimos. */
let pedido;

/** @type {string} Contiene el tipo MIME para setear en el header de la respuesta. */
let tipoMIME;

/** @type {string} contiene el url del archivo cuyo contenido vamos a servir */
let rutaArchivo = "";

/** @type {number} el puerto donde el servidor va a recibir pedidos */
const PORT = 3000;

/**
 * @description el objeto servidor que se va a utilizar para controlar el lifecycle y la configuracion del servidor.
 * @argument {http.RequestListener} servirFront para crear un sever debemos proveer un listener que va a recibir el pedido http y completar la respuesta.
 * En este caso usamos la funcion servirFront que se encarga de servir nuestro frontend.
 */
const server = http.createServer(servirFront);

/**
 * Comenzamos a recibir pedidos http.
 * @argument {number} PORT el puerto por el cuel el servidor va a recibir pedidos.
 * @argument {Function} inicializar  En nuestro caso pasamos una funcion que anuncia por consola que el servidor esta funcionando
 * y el puerto por el que recibe pedidos.
 */
server.listen(PORT, inicializar);

/*
Aca comienza la lista de funciones locales que usamos en el servidor.
*/

/**
 * @description devuelve el contenido del archivo ubicado en la ruta rutaArchivo (incluye el nombre del archivo.)
 * @returns {Buffer | undefined}
 */
function cargarArchivo() {
  rutaArchivo = pedido.url;
  console.log(`Pedido: ${rutaArchivo}`);

  if (rutaArchivo === "/") {
    rutaArchivo = rutaArchivo + "index.html";
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
 * @description respondemos con 404 cuando el servidor no puede resolver la ruta del archivo
 * que se pidio.
 */
function noEncontrado() {
  console.log(`No se encontro el archivo pedido: ${rutaArchivo}`);
  respuesta.writeHead(404);
  respuesta.end("404 La pagina no se encontro.");
}

/**
 * @description Esta funcion es llamada cada vez que el server recibe un pedido http. Esta funcion inspecciona el pedido,
 * ejecuta las acciones de base de datos que sean pertinentes y general el contenido que debe servir en la respuesta.
 * @param {http.IncomingMessage} req El pedido http que recibimos.
 * @param {http.ServerResponse} res La respuesta que vamos a mandar de regreso a quie hizo el pedido http; aquí vamos a escribir
 * el contenido que el servidor decida mandar.
 */
function servirFront(req, res) {
  respuesta = res;
  pedido = req;

  console.log("PROCESANDO PEDIDO ********************");
  /** @type {Buffer | undefined} */
  let contenido;
  /** @type {string} */
  let tipo = "text/html";

  const urlPedido = new URL(pedido.url);
  console.log("El end point es:", urlPedido.pathname);

  const formulario = new Formulario();
  contenido = formulario.procesar();

  if (!contenido) {
    contenido = cargarArchivo(pedido.pathname);

    if (!contenido) {
      noEncontrado(res);
      return;
    }
  }

  servir(contenido, tipo, res);
}

/**
 * @description Inicializa el servidor. Por el momento lo unico que hace es
 * mostrar un mensaje por consola para confirmar que el servidor ya inicio.
 */
function inicializar() {
  console.log(`Servidor escuchando en puerto ${PORT}`);
}

/**
 * @description devuelve el tipo de contenido MIME basndose en la extension del archivo contenido en la variable
 * global rutaArchivo.
 * @returns {string}
 */
function parseTipoContenido() {
  const extension = path.extname(rutaArchivo);
  const tiposMIME = {
    ".html": "text/html",
    ".js": "text/javascript",
    ".css": "text/css",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpg",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
    ".wav": "audio/wav",
    ".mp4": "video/mp4",
    ".woff": "application/font-woff",
    ".ttf": "application/font-ttf",
    ".eot": "application/vnd.ms-fontobject",
    ".otf": "application/font-otf",
    ".wasm": "application/wasm",
  };

  // el default es texto simple si la extension no esta en la lista de tipos MIME
  return tiposMIME[extension] || "application/octet-stream";
}

/**
 * @description una vez que tenemos el contenido pedido e identificamos el tipo MIME completamos la respuesta con esos datos
 */
function servir() {
  tipoMIME = parseTipoContenido();
  console.log("Sirviendo un archivo de tipo:", tipoMIME);
  respuesta.writeHead(200, { "Content-Type": tipoMIME });
  respuesta.end(contenido, "utf-8");
}
