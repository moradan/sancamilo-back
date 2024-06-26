const conexion = require("../conexiones/conexion_sql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


module.exports = autenticar;