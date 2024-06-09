/*
Este bloque contiene los requires/imports del proyecto
*/
import { Formulario } from "./src/formulario.js";
import fs from "fs";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";
import url from "url";

/** @type {string} la ruta de este archivo server.js en el servicio en el que este hospedado. */
const __filename = fileURLToPath(import.meta.url);
/** @type {string} el nombre del directorio en donde se encuentra este archivo. */
const __dirname = path.dirname(__filename);

/*
Este bloque contiene las instrucciones a ejecutar para poner en marcha el servidor
*/

/** @type {url} contiene el url del archivo cuyo contenido vamos a servir */
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
  console.log("PROCESANDO PEDIDO ********************");
  /** @type {Buffer | undefined} */
  let contenido;
  /** @type {string} */
  let tipo = "text/html";

  const pedido = url.parse(req.url, true);
  console.log("El end point es:", pedido.pathname);
  console.log("Los argumentos son:", pedido.query);
  // TODO Revisar si el pedido http viene de un formulario. De ser asi, ejecutar este bloque
  // TODO Crear un objeto formulario que contenga el metodo del pedido http y si viniese de un formulario los datos del formulario
  const formulario = new Formulario("GET");
  // TODO Procesar el formulario:
  //    validar los datos,
  //    realizar operaciones de base de datos,
  //    devolver el contenido que el server debe incluir en la respuesta

  if (!contenido) {
    contenido = cargarArchivo(pedido.pathname);

    if (!contenido) {
      noEncontrado(res);
      return;
    }

    tipo = parseTipoContenido();
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
 * @param {Buffer} contenido
 * @param {string} tipo
 * @param {http.ServerResponse} res
 */
function servir(contenido, tipo, res) {
  console.log("Sirviendo un archivo de tipo:", tipo);
  res.writeHead(200, { "Content-Type": tipo });
  res.end(contenido, "utf-8");
}
