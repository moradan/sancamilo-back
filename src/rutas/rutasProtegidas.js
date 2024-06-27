const express = require("express");
const middlewareAutenticacion = require("../middleware/middlewareAutenticacion");
const rutas = express.Router();

rutas.get("/", middlewareAutenticacion);

module.exports = rutas;