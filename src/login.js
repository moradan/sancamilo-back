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
    respuesta.status(422).json({ message: "el pedido no incluye todos los campos necesarios" });
    return;
  }

  /** @type {Usuario | undefined} */
  const usuarioBuscado = conexion.usuarioPorEmail(email);

  if (usuarioBuscado && password === usuarioBuscado.password) {
    respuesta.status(200).json({ message: "Usuario autentificado." });
  } else {
    respuesta.status(401).json({ message: "Nombre de usuario o contrasenia invalidos." });
  }
}

module.exports = login;