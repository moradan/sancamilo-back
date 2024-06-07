const http = require("http");
const path = require("path");
const fs = require("fs");

const server = http.createServer(servirFront);

const PORT = 3000;
const MANTENIMIENTO = false;

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
function noEncontrado(req, res) {
    res.writeHead(404);
    res.end("404 La pagina no se encontro.");
}

/**
 * 
 * @param {http.IncomingMessage} req 
 * @param {http.ServerResponse} res 
 */
function servirFront(req, res) {
    if(MANTENIMIENTO) {
        mantenimiento(req, res);
        return;
    }

    const rutaArchivo = path.join(__dirname, '../sancamilo-front/index.html');
    try {
        const indiceHTML = fs.readFileSync(rutaArchivo);
        res.setHeader("Content-Type", "text/html");
        res.writeHead(200);
        res.end(indiceHTML);
    } catch (/** @type {Error} */ error) {
        if (error.code === 'ENOENT') {
            noEncontrado(req, res);
        }
    }
}

function inicializar() {
    console.log(`Servidor escuchando en puerto ${PORT}`);
}

server.listen(PORT, inicializar); 