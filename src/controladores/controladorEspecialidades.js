const conexion = require("../conexiones/conexion_sql");

/**
 * @type {import("express").RequestHandler}
 */
function especialidades(pedido, respuesta) {
    const comandoSql = "SELECT * FROM especialidades";

    console.log("Consultando la base de datos para objeter especialidades.");
    conexion.query(comandoSql, (error, resultado) => {
        if (error) {
            console.log("no se pudo acceder a la base de datos.");
            console.error(error);
            respuesta.status(500).json({ mensaje: "No pudimos obtener la lista de especialidades. Intente mas tarde." });
            return;
        }

        console.log("Enviando lista de especialidades.");
        respuesta.status(200).json(resultado);
    });
}

module.exports = especialidades;