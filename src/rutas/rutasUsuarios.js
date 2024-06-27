const express = require("express");
const rutas = express.Router();
const controlador = require("../controladores/controladorUsuarios");

rutas.get("/login", controlador.login);
rutas.post("/registrarse", controlador.filtrarDuplicados, controlador.registrarse);
rutas.put("/:id", controlador.modificarUsuario);
rutas.get("/profesionales", controlador.profesionales);
rutas.delete("/:id", controlador.borrarUsuario);
rutas.get("/", controlador.todos);

module.exports = rutas;