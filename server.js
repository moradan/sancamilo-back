const express = require("express");

const rutasUsuarios = require("./src/rutas/rutasUsuarios");
const rutasEspecialidades = require("./src/rutas/rutasEspecialidades");
const rutasPrepagas = require("./src/rutas/rutasPrepagas");
const servidor = express();

const PORT = 3000;

servidor.use(express.json());
servidor.get('/', (req, res) => { res.status(200).json({ mensaje: "Api de SanCamilo" }) });
servidor.use('/usuarios', rutasUsuarios);
servidor.use('/especialidades', rutasEspecialidades);
servidor.use('/prepagas', rutasPrepagas);
servidor.listen(PORT, inicio);

function inicio() {
  console.log("Escuchando");
}