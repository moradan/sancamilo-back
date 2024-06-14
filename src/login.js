const fs = require("node:fs");
const Conexion = require("./conexion_datos");
const conexion = new Conexion;

/** 
 * @type {import("express").RequestHandler}
 */
function login(pedido, respuesta) {
  /** @type {string | undefined} */
  const email = pedido.query.email;
  /** @type {string | undefined} */
  const password = pedido.query.password;

  if (!email || !password) {
    respuesta.json(fs.readFileSync("./src/loginhelp.txt"));
    return;
  }

  /** @type {Usuario | undefined} */
  const usuarioBuscado = conexion.usuarioPorEmail(email);

  if (usuarioBuscado && password === usuarioBuscado.password) {
    respuesta.send("Usuario autentificado.");
  } else {
    respuesta.send("Nombre de usuario o contrasenia invalidos.");
  }
}

module.exports = login;