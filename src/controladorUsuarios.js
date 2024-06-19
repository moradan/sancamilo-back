const bd = require('./conexion_sql');

/**
 * @type {import("express").RequestHandler}
 */
function usuariosTodos(pedido, respuesta) {
    console.log("Consultando todos los usuarios en alwaysdata...");
    const comandoSql = 'SELECT * FROM usuarios';

    bd.query(comandoSql, (error, resultado) => {
        if (error) {
            console.error(error);
            respuesta.status(500).json({ mensaje: "No pudimos consultar la base de datos." })
            return;
        }

        respuesta.status(200).json(resultado);
        return;
    })
}

module.exports = {
    usuariosTodos,
}