// @ts-check
const express = require("express");
const rutas = express.Router();
const controlador = require("../controladores/controladorUsuarios");
const autenticar = require("../middleware/middlewareAutenticacion");
const esAdmin = require("../middleware/midelwareAdmin");

rutas.get("/login", controlador.login);
rutas.post("/registrarse", controlador.filtrarDuplicados, controlador.registrarse);
rutas.put("/:id", autenticar, controlador.modificarUsuario);
rutas.get("/profesionales", controlador.profesionales);
rutas.delete("/:id", autenticar, esAdmin, controlador.borrarUsuario);
rutas.get("/", controlador.todos);

module.exports = rutas;
