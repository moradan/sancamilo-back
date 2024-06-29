/** @type {import("express").RequestHandler} */
function esAdmin(pedido, respuesta) {
	console.log("Admin no implementado");
	respuesta.status(500).json({mensaje:"Esta API es solo para admin, y aun no esta implementada."});
}

module.exports = esAdmin;
