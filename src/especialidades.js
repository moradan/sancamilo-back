const Conexion = require("./conexion_datos");
const conexion = new Conexion;

/**
 * @type {import("express").RequestHandler}
 */
function especialidades(pedido, respuesta) {
    respuesta.status(200).json(conexion.especialidadesTodas());
}

module.exports = especialidades;