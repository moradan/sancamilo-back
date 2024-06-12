const express = require("express");
const router = express.Router();

router.get("/login", login);

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

  /** @type {string} */
  const contraseniaEncontrada = buscarEnBaseDeDatos(nombreUsuario);

  if (password === contraseniaEncontrada) {
    respuesta.send("Usuario autentificado.");
  } else {
    respuesta.send("Nombre de usuario o contrasenia invalidos.");
  }
}

/**
 * Se comunica con la base de datos, busca el nombre de usuario y de encontrarlo devuelve el password. 
 * @param {string} nombreUsuario 
 * @returns {string} El password que le corresponde al usuario enccocntrado.
 */
function buscarEnBaseDeDatos(nombreUsuario) {
  // TODO reemplazar este bloque por un acceso a la base de datos.
  if (nombreUsuario.toUpperCase() === "RODRIGO") {
    return "password";
  } else {
    return;
  }
}

module.exports = login;