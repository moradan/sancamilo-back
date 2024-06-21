const express = require("express");

const rutasUsuarios = require("./src/rutas/rutasUsuarios");

const servidor = express();

const PORT = 3000;

servidor.use('/usuarios', rutasUsuarios);
servidor.listen(PORT, inicio);

function inicio() {
  console.log("Escuchando");
}