const conexion = require('../conexiones/conexion_sql');

/**
 * @type {import("express").RequestHandler}
 */
function usuariosTodos(pedido, respuesta) {
    console.log("Consultando todos los usuarios en alwaysdata...");
    const comandoSql = 'SELECT * FROM usuarios';

    conexion.query(comandoSql, (error, resultado) => {
        if (error) {
            console.error(error);
            respuesta.status(500).json({ mensaje: "No pudimos consultar la base de datos." })
            return;
        }

        console.log("Enviamos la lista de usuarios.");
        respuesta.status(200).json(resultado);
        return;
    })
}

module.exports = {
    usuariosTodos,
}