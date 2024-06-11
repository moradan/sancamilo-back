/*globals __dirname */
const { log } = require("console");
const express = require("express");
const fs = require("node:fs");
const path = require("node:path");

const login = require("./src/login");

const servidor = express();

const PORT = 3000;

servidor.get("/", procesar);
servidor.get("/login", login);
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
  /** @type {Buffer} */
  const contenido = fs.readFileSync(path.join(__dirname, "/src/index.txt"));

  respuesta.setHeader("Status", 200);
  respuesta.setHeader("Content-Type", "text/plain");
  respuesta.end(contenido);
}
