const express = require("express");
const rutas = express.Router();
const controlador = require("../controladores/controladorTurnos");
const autenticar = require("../middleware/middlewareAutenticacion");

rutas.get("/", controlador.todos);
rutas.get("/profesional/:id", controlador.turnosProfesional);
rutas.get("/paciente/:id", controlador.turnosPaciente);
rutas.post("/nuevo", autenticar, controlador.nuevoTurno);
rutas.delete("/eliminar/:id", controlador.borrarTurno);

module.exports = rutas;