const express = require("express");
const rutas = express.Router();
const login = require("./login");
const registrarse = require("./registrarse");

rutas.get("/login", login);
rutas.get("/registrarse", registrarse);

module.exports = rutas;