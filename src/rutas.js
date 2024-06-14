/*globals __dirname */
const { log } = require("console");
const fs = require('node:fs');
const path = require("node:path");
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
    log("Recibimos un pedido", pedido);
    /** @type {Buffer} */
    const contenido = fs.readFileSync(path.join(__dirname, "/src/index.txt"));

    respuesta.setHeader("Status", 200);
    respuesta.setHeader("Content-Type", "text/plain");
    respuesta.end(contenido);
}

module.exports = rutas;