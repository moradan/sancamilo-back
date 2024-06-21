const express = require("express");
const rutas = express.Router();
const controlador = require("../controladores/controladorUsuarios");

rutas.get("/login", controlador.login);
rutas.get("/registrarse", controlador.registrarse);
rutas.get("/profesionales", controlador.profesionales);
rutas.get("/todos", controlador.todos);

module.exports = rutas;