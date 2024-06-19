const conexion = require("../conexiones/conexion_sql");

/** 
 * @type {import("express").RequestHandler}
 */
function login(pedido, respuesta) {
  /** @type {string | undefined} */
  const email = pedido.query.email;
  /** @type {string | undefined} */
  const password = pedido.query.password;

  if (!email || !password) {
    respuesta.status(400).json({ message: "el pedido no incluye todos los campos necesarios" });
    return;
  }

  /** @type {string} */
  const comandoSql = "SELECT * FROM usuarios WHERE email = ?";

  conexion.query(comandoSql, [email], (error, resultado) => {
    if (error) {
      console.log(error);
      respuesta.status(500).json({ mensaje: "no se pudo completar la busqueda." });
      return;
    }

    if (resultado.length > 1) {
      console.log(resultado);
      respuesta.status(500).json({ mensaje: "hay varios registros con el mismo email y solo deberia haber 1." });
      return;
    }

    const usuarioBuscado = resultado[0];
    if (usuarioBuscado && password === usuarioBuscado.password) {
      respuesta.status(200).json({ message: "Usuario autentificado." });
    } else {
      respuesta.status(401).json({ message: "Nombre de usuario o contrasenia invalidos." });
    }
    return;
  });
}

module.exports = login;