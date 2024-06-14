const express = require("express");
const rutas = express.Router();
const login = require("./login");
const registrarse = require("./registrarse");
const prepagas = require("./prepagas");
const especialidades = require("./especialidades");

rutas.get("/", apiRoot);
rutas.get("/login", login);
rutas.get("/registrarse", registrarse);
rutas.get("/prepagas", prepagas);
rutas.get("/especialidades", especialidades);

/**
 * @type {import("express").RequestHandler} Esta funcion maneja los request de la raiz.
 */
function apiRoot(pedido, respuesta) {
    respuesta.send("API SanCamilo");
}

module.exports = rutas;