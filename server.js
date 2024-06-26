const express = require("express");
const cors = require("cors");

const rutasUsuarios = require("./src/rutas/rutasUsuarios");
const rutasEspecialidades = require("./src/rutas/rutasEspecialidades");
const rutasPrepagas = require("./src/rutas/rutasPrepagas");
const rutasTurnos = require("./src/rutas/rutasTurnos");
const rutasAutenticacion = require("./src/rutas/rutaAutenticacion");
const servidor = express();

const PORT = 3000;

servidor.use(express.json());
servidor.use(cors());

servidor.get('/', rutaRaiz);
servidor.use('/usuarios', rutasUsuarios);
servidor.use('/especialidades', rutasEspecialidades);
servidor.use('/prepagas', rutasPrepagas);
servidor.use('/turnos', rutasTurnos);
servidor.use('/autenticar', rutasAutenticacion);
servidor.listen(PORT, inicio);

function inicio() {
  console.log(`Escuchando en puerto: ${PORT}`);
}

/**
 * @type {import("express").RequestHandler} 
 */
function rutaRaiz(pedido, respuesta) {
  respuesta.status(200).json({ mensaje: "Api de SanCamilo" })
}