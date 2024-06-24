const conexion = require("../conexiones/conexion_sql");

/** 
 * @type {import("express").RequestHandler}
 */
function prepagas(pedido, respuesta) {
    const comandoSql = "SELECT * FROM prepagas";

    conexion.query(comandoSql, (error, resultados) => {
        if (error) {
            console.log("No se pudo consultar la base de datos");
            console.error(error);
            respuesta.status(500).send("No se pudo consultar la base de datos");
            return;
        } else {
            console.log("Enviando la lista de prepagas");
            respuesta.status(200).json({ mensaje: "Lista de prepagas", lista: resultados });
            return;
        }
    });
}

module.exports = prepagas;