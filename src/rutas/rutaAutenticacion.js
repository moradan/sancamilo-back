const express = require("express");
const rutas = express.Router();
const middlewareAutenticacion = require("../middleware/middlewareAutenticacion");

rutas.get("/", middlewareAutenticacion, confirmado);

/** @type {import("express").RequestHandler} */
function confirmado(pedido, respuesta) {
    respuesta.status(200).json({});
}
module.exports = rutas;