//TODO adaptar este codigo para usar conexion_sql
const Conexion = require("../conexiones/conexion_datos");
const conexion = new Conexion;

/** 
 * @type {import("express").RequestHandler}
 */
function prepagas(pedido, respuesta) {
    const listaPrepagas = conexion.prepagasTodas();
    respuesta.status(200).json(listaPrepagas);
}

module.exports = prepagas;