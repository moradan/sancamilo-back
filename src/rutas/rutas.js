const express = require("express");
const rutas = express.Router();
const login = require("../controladores/login");
const registrarse = require("../registrarse");
const prepagas = require("../prepagas");
const especialidades = require("../especialidades");
const turnos = require("../turnos");
const profesionales = require("../controladores/profesionales");
const { usuariosTodos } = require("../controladores/usuarios");

rutas.get("/", apiRoot);
rutas.get("/login", login);
rutas.get("/registrarse", registrarse);
rutas.get("/prepagas", prepagas);
rutas.get("/profesionales", profesionales);
rutas.get("/usuarios", usuariosTodos);
rutas.get("/especialidades", especialidades);
rutas.get("/turnos", turnos);

/**
 * @type {import("express").RequestHandler} Esta funcion maneja los request de la raiz.
 */
function apiRoot(pedido, respuesta) {
    respuesta.status(200).send("API SanCamilo");
}

module.exports = rutas;