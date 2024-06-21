const express = require("express");
const rutas = express.Router();
const controlador = require("../controladores/controladorEspecialidades");

rutas.get("/todos", controlador);

module.exports = rutas;