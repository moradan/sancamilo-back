const Conexion = require("./conexiones/conexion_datos");
const conexion = new Conexion;

/**
 * @type {import("express").RequestHandler}
 */
function profesionales(pedido, respuesta) {
    respuesta.status(200).json(conexion.profesionalesTodos());
}

module.exports = profesionales;