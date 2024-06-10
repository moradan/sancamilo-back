const { log } = require("console");
const express = require("express");
const http = require("http");

const servidor = express();

const PORT = 3000;

servidor.get("/", procesar);
servidor.listen(PORT, inicio);

function inicio() {
  log("Escuchando");
}

/**
 *
 * @param {http.IncomingMessage} pedido
 * @param {http.ServerResponse} respuesta
 */
function procesar(pedido, respuesta) {
  log("Recibimos un pedido", pedido);
  respuesta.setHeader("Status", 200);
  respuesta.setHeader("Content-Type", "text/html");
  respuesta.end("Respuesta");
}
