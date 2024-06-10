const express = require("express");

const servidor = express();

const PORT = 3000;

servidor.listen(PORT, procesador);

function procesador(pedido, respuesta) {}
