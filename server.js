const http = require("http");
const path = require("path");
const fs = require("fs");

const server = http.createServer(servirFront);

const PORT = 3000;

/**
 * 
 * @param {http.IncomingMessage} req 
 * @param {http.ServerResponse} res 
 */
function mantenimiento(req, res) {
    res.writeHead(503);
    res.end("503 Server Unavailable\nEl servidor aun no esta listo para mostrar la pagina.")
}

/**
 * 
 * @param {http.IncomingMessage} req 
 * @param {http.ServerResponse} res 
 */
function servirFront(req, res) {
    res.setHeader("Content-Type", "text/html");
    res.writeHead(200);

    const rutaArchivo = path.join(__dirname, '../sancamilo-front/index.html');
    const indiceHTML = fs.readFileSync(rutaArchivo);

    res.end(indiceHTML);
}

function inicializar() {
    console.log(`Servidor escuchando en puerto ${PORT}`);
}

server.listen(PORT, inicializar); 

