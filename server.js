const { log } = require("console");
const express = require("express");

const rutas = require("./src/rutas/rutas");

const servidor = express();

const PORT = 3000;

servidor.use(rutas);
servidor.listen(PORT, inicio);

function inicio() {
  log("Escuchando");
}