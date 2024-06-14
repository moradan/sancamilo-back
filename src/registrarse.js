/**
 * @type {import("express").RequestHandler}
 */
function registrarse(pedido, respuesta) {
    respuesta.status(501).json({ message: "todavia no te podes registrar" });
}

module.exports = registrarse;