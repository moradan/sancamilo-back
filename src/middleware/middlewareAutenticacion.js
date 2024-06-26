const jwt = require("jsonwebtoken");

/** @type {import("express").RequestHandler} */
function autenticar(pedido, respuesta, proximo) {
    proximo();
}

module.exports = autenticar;