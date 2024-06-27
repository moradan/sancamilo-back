const conexion = require("../conexiones/conexion_sql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

/** @type {import("express").RequestHandler} */
function autenticar(pedido, respuesta) {
    console.log("Se intento acceder a una ruta protegida, aun no implementado.");
    respuesta.status(501).json({ mensaje: "Todavia no se puede acceder a areas protegidas." });
}

module.exports = autenticar;