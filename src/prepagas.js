const Conexion = require("./conexion_datos");
const conexion = new Conexion;

/** 
 * @type {import("express").RequestHandler}
 */
function prepagas(pedido, respuesta) {
    const listaPrepagas = conexion.prepagasTodas();
    respuesta.json(listaPrepagas);
}

module.exports = prepagas;