const http = require("http");

const server = http.createServer(listener);

const PORT = 3000;

/**
 * 
 * @param {http.IncomingMessage} req 
 * @param {http.ServerResponse} res 
 */
function listener(req, res) {
    res.writeHead(200);
    res.end("El servidor aun no esta listo para mostrar la pagina.")
}

server.listen(PORT, () => console.log(`Servidor escuchando en puerto ${PORT}`));

