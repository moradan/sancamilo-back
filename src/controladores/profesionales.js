const conexion = require("../conexiones/conexion_sql");

/**
 * @type {import("express").RequestHandler}
 */
function profesionales(pedido, respuesta) {
    const comandoSql = "SELECT * FROM usuarios WHERE especialidad IS NOT NULL";

    console.log("Consultando la tabla de profesionales.");
    conexion.query(comandoSql, (error, resultado) => {
        if (error) {
            console.log("Ocurrio un error ejecutando la consulta:");
            console.error(error);
            respuesta.status(500).json({ mensaje: "No pudimos ejecutar la consulta." });
            console.log("Respuesta enviada con estado 500.");
            return;
        }
        console.log("Respuesta enviada con lista de profesionales.");
        respuesta.status(200).json(resultado);
    })
}

module.exports = profesionales;