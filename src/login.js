const http = require("node:http");

/** 
 * @param {http.IncomingMessage} pedido 
 * @param {http.ServerResponse} respuesta
 */
function login(pedido, respuesta) {
    respuesta.send("Todavia no podemos validar usuarios");
}

module.exports = login;