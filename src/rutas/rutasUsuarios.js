const express = require("express");
const rutas = express.Router();
const controlador = require("../controladores/controladorUsuarios");

rutas.post("/login/:email/:password", controlador.login);
rutas.post("/registrarse", controlador.registrarse);
rutas.get("/profesionales", controlador.profesionales);
rutas.get("/", controlador.todos);

module.exports = rutas;