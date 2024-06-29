// @ts-check
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const rutasUsuarios = require("./src/rutas/rutasUsuarios");
const rutasEspecialidades = require("./src/rutas/rutasEspecialidades");
const rutasPrepagas = require("./src/rutas/rutasPrepagas");
const rutasTurnos = require("./src/rutas/rutasTurnos");

const servidor = express();

servidor.use(express.json());
servidor.use(cors());

servidor.get('/', rutaRaiz);
servidor.use('/usuarios', rutasUsuarios);
servidor.use('/especialidades', rutasEspecialidades);
servidor.use('/prepagas', rutasPrepagas);
servidor.use('/turnos', rutasTurnos);
servidor.listen(process.env.PORT, inicio);
servidor.on("error", (evento) => {
	console.error(evento);
	if(confirm("Hubo un error. Reiniciamos?")) {
		console.log("Reiniciando...");
		servidor.listen(process.env.PORT, inicio);
	}
});

function inicio() {
  console.log(`Escuchando en puerto: ${process.env.PORT}`);
}

/**
 * @type {import("express").RequestHandler} 
 */
function rutaRaiz(pedido, respuesta) {
	console.log("Servimos el mensaje de bienvenida.");
  respuesta.status(200).json({ mensaje: "Api de SanCamilo" })
}
