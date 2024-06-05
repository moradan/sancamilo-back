const http = require("http");

const server = http.createServer(funcionalidad);

async function funcionalidad(req, resp) {}

const PORT = 3000;

server.listen(PORT, () => console.log(`Servidor escuchando a ${PORT}`));

