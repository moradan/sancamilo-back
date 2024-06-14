const express = require("express");
const rutas = express.Router();
const login = require("./login");
const registrarse = require("./registrarse");
const prepagas = require("./prepagas");

rutas.get("/login", login);
rutas.get("/registrarse", registrarse);
rutas.get("/prepagas", prepagas);

module.exports = rutas;