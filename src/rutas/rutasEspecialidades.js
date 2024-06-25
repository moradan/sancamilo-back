const express = require("express");
const rutas = express.Router();
const controlador = require("../controladores/controladorEspecialidades");

rutas.get("/", controlador);

module.exports = rutas;