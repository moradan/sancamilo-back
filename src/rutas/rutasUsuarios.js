const express = require("express");
const rutas = express.Router();
const controlador = require("../controladores/controladorUsuarios");

rutas.post("/login/:email/:password", controlador.login);
rutas.post("/registrarse", controlador.filtrarDuplicados, controlador.registrarse);
rutas.get("/profesionales", controlador.profesionales);
rutas.delete("/:id", controlador.borrarUsuario);
rutas.get("/", controlador.todos);

module.exports = rutas;