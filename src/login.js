const Conexion = require("./conexion_datos");
const conexion = new Conexion;

/** 
 * @type {import("express").RequestHandler}
 */
function login(pedido, respuesta) {
  /** @type {string | undefined} */
  const nombreUsuario = pedido.query.nombreUsuario;
  /** @type {string | undefined} */
  const password = pedido.query.password;

  if (!nombreUsuario || !password) {
    respuesta.send("Estas usando mal la API.");
    return;
  }

  /** @type {Usuario | undefined} */
  const usuarioBuscado = conexion.usuarioPorNombre(nombreUsuario);

  if (usuarioBuscado && password === usuarioBuscado.password) {
    respuesta.send("Usuario autentificado.");
  } else {
    respuesta.send("Nombre de usuario o contrasenia invalidos.");
  }
}

module.exports = login;