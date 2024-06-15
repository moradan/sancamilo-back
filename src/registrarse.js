const Conexion = require('./conexion_datos');
const { Usuario } = require('./tipos_datos');
/** @type {import("./conexion_datos").Conexion} */
const conexion = new Conexion;

/**
 * Este modulo atiende los pedidos de la API para registrar un usuario. Debe comprobar que el usuario no sea duplicado y agregarlo a la base de datos
 * luego devolver un json con un mensaje de confirmacion y estado 201 Created. De ser un usuario duplicado debe contestar con 409 Resource Conflict.
 * @type {import("express").RequestHandler}
 */
function registrarse(pedido, respuesta) {
    /** @type {string | undefined} */
    const email = pedido.query.email;
    if (!email) {
        respuesta.status(400).json({ message: "el pedido no está bien formulado" })
        return;
    }

    if (conexion.usuarioExiste(email)) {
        respuesta.status(409).json({ message: "Ya existe un usuario con esa direccion de email." });
        return;
    }

    /** @type {Usuario | undefined} */
    const usuarioParaAgregar = new Usuario(
        pedido.query.nombreCompleto,
        pedido.query.sexo,
        pedido.query.fechaNacimiento,
        pedido.query.email,
        pedido.query.prepaga,
        pedido.query.especialidad,
        pedido.query.password
    );

    respuesta.status(501).json(
        {
            message: "en un futuro podremos agregar toda esa informacion a la bd",
            usuario: usuarioParaAgregar
        }
    );
}

module.exports = registrarse;