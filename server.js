/*globals __dirname */
const { log } = require("console");
const express = require("express");
const fs = require("node:fs");
const path = require("node:path");

const login = require("./src/login");
const registrarse = require("./src/registrarse");
const registrarse = require("./src/registrarse");

const servidor = express();

const PORT = 3000;

servidor.get("/", apiRoot);
<<<<<<< HEAD
servidor.use(login);
=======
servidor.get("/login", login);
servidor.get("/registrarse", registrarse);
>>>>>>> 44433dd4f0470cb21ef224428fba6b1330a5ab94
servidor.listen(PORT, inicio);

function inicio() {
  log("Escuchando");
}

/**
 * @type {import("express").RequestHandler} Esta funcion maneja los request de la raiz.
 */
function apiRoot(pedido, respuesta) {
  log("Recibimos un pedido", pedido);
  /** @type {Buffer} */
  const contenido = fs.readFileSync(path.join(__dirname, "/src/index.txt"));

  respuesta.setHeader("Status", 200);
  respuesta.setHeader("Content-Type", "text/plain");
  respuesta.end(contenido);
}
