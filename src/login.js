const http = require("node:http");

/** 
 * @param {http.IncomingMessage} pedido 
 * @param {http.ServerResponse} respuesta
 */
function login(pedido, respuesta) {
    respuesta.setHeader("Status-Code", 200);
    respuesta.setHeader("Content-Type", "text/plain");
    respuesta.end("Todavia no podemos validar usuarios");
}

module.exports = login;