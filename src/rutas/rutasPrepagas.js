const express = require("express");
const rutas = express.Router();
const controlador = require("../controladores/controladorPrepagas");

rutas.get("/", controlador);

module.exports = rutas;